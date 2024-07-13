import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { bikeSchema, bikeListSchema, type BikeCreate, type BikeUpdate } from '$lib/models';
import { type TypedPocketBase } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (_filters: Record<string, unknown> = {}) => {
	const records = await pb.collection('bikes').getFullList();
	const bikes = bikeListSchema.parse(records);
	return bikes;
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
