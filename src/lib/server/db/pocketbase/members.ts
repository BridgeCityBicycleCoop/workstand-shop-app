import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import {
	memberSchema,
	memberListSchema,
	type MemberCreate,
	type MemberUpdate
} from '$lib/models/member';
import { type TypedPocketBase } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (_filters: Record<string, unknown> = {}) => {
	const records = await pb.collection('members').getFullList();
	const members = memberListSchema.parse(records);
	return members;
};
export const get = async (id: string) => {
	return memberSchema.parse(await pb.collection('members').getOne(id));
};
export const add = async (data: MemberCreate) => {
	return memberSchema.parse(await pb.collection('members').create(data));
};
export const update = async (id: string, data: MemberUpdate) => {
	return memberSchema.parse(await pb.collection('members').update(id, data));
};
export const remove = async (id: string) => {
	return await pb.collection('members').delete(id);
};
