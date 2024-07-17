import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { memberSchema, memberListSchema, type MemberCreate, type MemberUpdate } from '$lib/models';
import { constructNow, startOfToday } from 'date-fns';
import type { TypedPocketBase, MembersResponse } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (_filters: Record<string, unknown> = {}) => {
	const records = await pb.collection('members').getFullList();
	return memberListSchema.parse(records);
};

// no startDate or endDate, all members,
// startDate only, should end with the latest member
// endDate only, should start from the very first member
export const findByDate = async (options: { startDate?: string; endDate?: string } = {}) => {
	let filter;

	if (!options.startDate && !options.endDate) {
		filter = pb.filter('');
	} else {
		const startDateTime = options.startDate ? new Date(options.startDate) : startOfToday();
		const endDateTime = options.endDate ? new Date(options.endDate) : constructNow(new Date());
		filter = pb.filter('{:endDateTime} >= waiver && {:startDateTime} <= waiver', {
			startDateTime,
			endDateTime
		});
	}

	const listResult = await pb.collection('members').getList<MembersResponse>(1, 100, {
		filter,
		sort: '-waiver'
	});

	return memberListSchema.parse(listResult.items);
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
