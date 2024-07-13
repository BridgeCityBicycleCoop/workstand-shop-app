import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { memberSchema, memberListSchema, type MemberCreate, type MemberUpdate } from '$lib/models';
import { type TypedPocketBase } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (_filters: Record<string, unknown> = {}) => {
	const records = await pb.collection('members').getFullList();
	return memberListSchema.parse(records);
};

export const get = async (id: string) =>
	memberSchema.parse(await pb.collection('members').getOne(id));

export const add = async (data: MemberCreate) =>
	memberSchema.parse(await pb.collection('members').create(data));

export const update = async (data: MemberUpdate) =>
	memberSchema.parse(await pb.collection('members').update(data.id, data));

export const remove = async (id: string) => {
	return await pb.collection('members').delete(id);
};
