import PocketBase, { type RecordFullListOptions, type RecordOptions } from 'pocketbase';
import { env } from '$env/dynamic/private';
import { memberSchema, memberListSchema, type MemberCreate } from '$lib/models/member';
import { type TypedPocketBase, type MembersRecord } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (
	_filters: Record<string, unknown> = {},
	params?: RecordFullListOptions
) => {
	const records = await pb.collection('members').getFullList(params);
	return memberListSchema.parse(records);
};
export const get = async (id: string, params?: RecordOptions) => {
	return memberSchema.parse(await pb.collection('members').getOne(id, params));
};
export const add = async (data: MemberCreate, params?: RecordOptions) => {
	return memberSchema.parse(await pb.collection('members').create(data, params));
};
export const update = async (id: string, data: Partial<MembersRecord>, params?: RecordOptions) => {
	return await pb.collection('members').update(id, data, params);
};
export const remove = async (id: string, params?: RecordOptions) => {
	return await pb.collection('members').delete(id, params);
};
