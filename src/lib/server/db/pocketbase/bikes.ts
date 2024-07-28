import PocketBase, { ClientResponseError } from 'pocketbase';
import { z } from 'zod';
import { env } from '$env/dynamic/private';
import {
	bikeSchema,
	bikeListSchema,
	type Bike,
	type BikeCreate,
	type BikeUpdate
} from '$lib/models';
import { parseISO } from 'date-fns';
import {
	getStartDate,
	getEndDate,
	getTzConvertedStartEndDates
} from '$lib/server/utils/getTzConvertedStartEndDates';
import type { TypedPocketBase, BikesResponse } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

const optionalDateFromString = z
	.string()
	.nullish()
	.transform((dateStringMaybe) => {
		return !dateStringMaybe ? undefined : parseISO(dateStringMaybe);
	})
	.pipe(z.date().optional());

const bikeRecordSchema = z
	.object({
		donationDate: optionalDateFromString,
		cpicDate: optionalDateFromString,
		outOfShopDate: optionalDateFromString
	})
	.passthrough();
const recordToBikeSchema = bikeRecordSchema.pipe(bikeSchema);
const bikeRecordListSchema = bikeRecordSchema.array();
const recordsToBikeListSchema = bikeRecordListSchema.pipe(bikeListSchema);

export const find = async (_filters: Record<string, unknown> = {}): Promise<Bike[]> => {
	const records = await pb
		.collection('bikes')
		.getFullList<BikesResponse>()
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	const bikes = recordsToBikeListSchema.parse(records);
	return bikes;
};
// no startDate or endDate, all bikes,
// startDate only, should end with the latest bike
// endDate only, should start from the very first bike
export const findByDate = async (
	options: { startDate?: string; endDate?: string } = {}
): Promise<Bike[]> => {
	let filter;

	if (!options.startDate && !options.endDate) {
		filter = pb.filter('');
	} else {
		const { startDateTime, endDateTime } = getTzConvertedStartEndDates(
			getStartDate(options.startDate),
			getEndDate(options.endDate),
			'UTC'
		);

		filter = pb.filter('{:startDateTime} <= donationDate && {:endDateTime} >= donationDate', {
			startDateTime,
			endDateTime
		});
	}

	const listResult = await pb
		.collection('bikes')
		.getList<BikesResponse>(1, 100, {
			filter,
			sort: '-donationDate'
		})
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});

	return recordsToBikeListSchema.parse(listResult.items);
};
export const get = async (id: string): Promise<Bike> => {
	return recordToBikeSchema.parse(
		await pb
			.collection('bikes')
			.getOne(id)
			.catch((e: ClientResponseError) => {
				throw e.originalError;
			})
	);
};
export const add = async (data: BikeCreate): Promise<Bike> => {
	return recordToBikeSchema.parse(
		await pb
			.collection('bikes')
			.create(data)
			.catch((e: ClientResponseError) => {
				throw e.originalError;
			})
	);
};
export const update = async (data: BikeUpdate): Promise<Bike> => {
	return recordToBikeSchema.parse(
		await pb
			.collection('bikes')
			.update(data.id, data)
			.catch((e: ClientResponseError) => {
				throw e.originalError;
			})
	);
};
export const remove = async (id: string): Promise<boolean> => {
	return await pb
		.collection('bikes')
		.delete(id)
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
};
