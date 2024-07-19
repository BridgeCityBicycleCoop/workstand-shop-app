import PocketBase, { type RecordFullListOptions, type RecordOptions } from 'pocketbase';
import { env } from '$env/dynamic/private';
import {
	purposeSchema,
	purposeListSchema,
	type PurposeCreate,
	type PurposeUpdate
} from '$lib/models';
import { type TypedPocketBase } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (
	_filters: Record<string, unknown> = {},
	params?: RecordFullListOptions
) => {
	const records = await pb
		.collection('purposes')
		.getFullList(params)
		.catch((e) => {
			throw e.originalError;
		});
	return purposeListSchema.parse(records);
};
export const get = async (id: string, params?: RecordOptions) => {
	return purposeSchema.parse(
		await pb
			.collection('purposes')
			.getOne(id, params)
			.catch((e) => {
				throw e.originalError;
			})
	);
};
export const add = async (data: PurposeCreate, params?: RecordOptions) => {
	return purposeSchema.parse(
		await pb
			.collection('purposes')
			.create(data, params)
			.catch((e) => {
				throw e.originalError;
			})
	);
};
export const update = async (data: PurposeUpdate) => {
	return await purposeSchema.parse(
		pb
			.collection('purposes')
			.update(data.id, data)
			.catch((e) => {
				throw e.originalError;
			})
	);
};
export const remove = async (id: string, params?: RecordOptions) => {
	return await pb
		.collection('purposes')
		.delete(id, params)
		.catch<boolean>((e) => {
			throw e.originalError;
		});
};
