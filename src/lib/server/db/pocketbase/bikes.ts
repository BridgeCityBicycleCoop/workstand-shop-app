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
import { createDateFilter } from './utils';
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

interface FindByDateResult {
	bikesList: Bike[];
	totalMembers: number;
	page: number;
	perPage: number;
	totalPages: number;
}

// no startDate or endDate, all bikes,
// startDate only, should end with the latest bike
// endDate only, should start from the very first bike
export const findByDate = async ({
	startDate,
	endDate,
	page = 1,
	perPage = 30,
	sortBy = 'donationDate',
	sortDirection = 'descending'
}: {
	startDate?: Date;
	endDate?: Date;
	page?: number;
	perPage?: number;
	sortBy?: string;
	sortDirection?: string;
} = {}): Promise<FindByDateResult> => {
	const filter = createDateFilter('donationDate', { startDate, endDate });
	const ascendOrDescend = sortDirection === 'descending' ? '-' : '+';
	const sortString = ascendOrDescend + sortBy;

	const listResult = await pb
		.collection('bikes')
		.getList<BikesResponse>(page, perPage, {
			filter,
			sort: sortString
		})
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});

	return {
		bikesList: recordsToBikeListSchema.parse(listResult.items),
		totalMembers: listResult.totalItems,
		page: listResult.page,
		perPage: listResult.perPage,
		totalPages: listResult.totalPages
	};
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
