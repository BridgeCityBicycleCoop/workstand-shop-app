import PocketBase, { type RecordFullListOptions, type RecordOptions } from 'pocketbase';
import { env } from '$env/dynamic/private';
import {
	purposeSchema,
	purposeListSchema,
	type PurposeCreate,
	type PurposeUpdate
} from '$lib/models/purpose';
import { type TypedPocketBase } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (
	_filters: Record<string, unknown> = {},
	params?: RecordFullListOptions
) => {
	const records = await pb.collection('purposes').getFullList(params);
	return purposeListSchema.parse(records);
};
export const get = async (id: string, params?: RecordOptions) => {
	return purposeSchema.parse(await pb.collection('purposes').getOne(id, params));
};
export const add = async (data: PurposeCreate, params?: RecordOptions) => {
	return purposeSchema.parse(await pb.collection('purposes').create(data, params));
};
export const update = async (data: PurposeUpdate) => {
	return await pb.collection('purposes').update(data.id, data);
};
export const remove = async (id: string, params?: RecordOptions) => {
	return await pb.collection('purposes').delete(id, params);
};
