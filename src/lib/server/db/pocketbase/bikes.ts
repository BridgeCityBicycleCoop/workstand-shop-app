import PocketBase, { ClientResponseError } from 'pocketbase';
import { z } from 'zod';
import { env } from '$env/dynamic/private';
import {
	bikeSchema,
	bikeListSchema,
	bikeFilterSchema,
	type Bike,
	type BikeCreate,
	type BikeUpdate,
	type BikeFilter
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

export const find = async (filters: BikeFilter = {}) => {
	const parsedFilters = bikeFilterSchema.parse(filters);
	const {
		page = 1,
		perPage = 30,
		sortBy = 'donationDate',
		sortDirection = 'descending'
	} = parsedFilters;
	const sortString = `${sortDirection === 'descending' ? '-' : '+'}${sortBy}`;

	const filterElements = [];
	if ('startDate' in filters || 'endDate' in filters) {
		// no startDate or endDate, all bikes,
		// startDate only, should end with the latest bike
		// endDate only, should start from the very first bike
		filterElements.push(createDateFilter('donationDate', filters));
	}
	if ('available' in filters) {
		if (filters.available) {
			filterElements.push(pb.filter('outOfShopDate = null'));
		} else {
			filterElements.push(pb.filter('outOfShopDate != null'));
		}
	}
	const filter = filterElements.join(' && ');

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
		list: recordsToBikeListSchema.parse(listResult.items),
		total: listResult.totalItems,
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
