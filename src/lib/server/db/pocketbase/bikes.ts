import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { bikeSchema, bikeListSchema, type BikeCreate, type BikeUpdate } from '$lib/models';
import { constructNow, startOfToday } from 'date-fns';
import type { TypedPocketBase, BikesResponse } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (_filters: Record<string, unknown> = {}) => {
	const records = await pb.collection('bikes').getFullList<BikesResponse>();
	const bikes = bikeListSchema.parse(records);
	return bikes;
};
// no startDate or endDate, all bikes,
// startDate only, should end with the latest bike
// endDate only, should start from the very first bike
export const findByDate = async (options: { startDate?: string; endDate?: string } = {}) => {
	let filter;

	if (!options.startDate && !options.endDate) {
		filter = pb.filter('');
	} else {
		const startDateTime = options.startDate ? new Date(options.startDate) : startOfToday();
		const endDateTime = options.endDate ? new Date(options.endDate) : constructNow(new Date());
		filter = pb.filter('{:endDateTime} >= donationDate && {:startDateTime} <= donationDate', {
			startDateTime,
			endDateTime
		});
	}

	const listResult = await pb.collection('bikes').getList<BikesResponse>(1, 100, {
		filter,
		sort: '-donationDate'
	});

	return bikeListSchema.parse(listResult.items);
};
export const get = async (id: string) => {
	return bikeSchema.parse(await pb.collection('bikes').getOne(id));
};
export const add = async (data: BikeCreate) => {
	return bikeSchema.parse(await pb.collection('bikes').create(data));
};
export const update = async (data: BikeUpdate) => {
	return bikeSchema.parse(await pb.collection('bikes').update(data.id, data));
};
export const remove = async (id: string) => {
	return await pb.collection('bikes').delete(id);
};
