import PocketBase, { type RecordFullListOptions, type RecordOptions } from 'pocketbase';
import { env } from '$env/dynamic/private';
import { visitSchema, visitListSchema, type VisitCreate } from '$lib/models/visit';
import { type TypedPocketBase, type VisitsRecord } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (
	_filters: Record<string, unknown> = {},
	params?: RecordFullListOptions
) => {
	const records = await pb.collection('visits').getFullList(params);
	return visitListSchema.parse(records);
};
export const get = async (id: string, params?: RecordOptions) => {
	return visitSchema.parse(await pb.collection('visits').getOne(id, params));
};
export const add = async (data: VisitCreate, params?: RecordOptions) => {
	return visitSchema.parse(await pb.collection('visits').create(data, params));
};
export const update = async (id: string, data: Partial<VisitsRecord>, params?: RecordOptions) => {
	return await pb.collection('visits').update(id, data, params);
};
export const remove = async (id: string, params?: RecordOptions) => {
	return await pb.collection('visits').delete(id, params);
};
