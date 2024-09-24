import PocketBase, { ClientResponseError } from 'pocketbase';
import { z } from 'zod';
import { env } from '$env/dynamic/private';
import {
	memberSchema,
	memberListSchema,
	type MemberCreate,
	type MemberUpdate,
	type Member
} from '$lib/models';
import { createDateFilter } from './utils';
import type { TypedPocketBase, MembersResponse } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

const memberRecordSchema = z.object({ waiver: z.coerce.date() }).passthrough();
const recordToMemberSchema = memberRecordSchema.pipe(memberSchema);
const memberRecordListSchema = memberRecordSchema.array();
const recordsToMemberListSchema = memberRecordListSchema.pipe(memberListSchema);

export const find = async (_filters: Record<string, unknown> = {}): Promise<Member[]> => {
	const records = await pb
		.collection('members')
		.getFullList()
		.catch((e) => {
			throw e.originalError;
		});
	return recordsToMemberListSchema.parse(records);
};

// no startDate or endDate, all members,
// startDate only, should end with the latest member
// endDate only, should start from the very first member
// foo: 2024-07-23 00:31:37 (UTC) -- should show on 7-22 filter for eastern time zone GMT-4
export const findByDate = async ({
	startDate,
	endDate,
	page = 1,
	perPage = 30,
	sortBy = 'waiver',
	sortDirection = 'ascending'
}: {
	startDate?: Date;
	endDate?: Date;
	page?: number;
	perPage?: number;
	sortBy?: string;
	sortDirection?: string;
} = {}): Promise<Member[]> => {
	const filter = createDateFilter('waiver', { startDate, endDate });
	const ascendOrDescend = sortDirection === 'descending' ? '+' : '-';
	const sortString = ascendOrDescend + sortBy;

	const listResult = await pb
		.collection('members')
		.getList<MembersResponse>(1, 30, {
			filter,
			sort: sortString,
			page,
			perPage
		})
		.catch((e) => {
			throw e.originalError;
		});

	// const { page, perPage, totalItems, totalPages, items } = listResult;

	// console.log('pagination deets', page, perPage, totalItems, totalPages);
	return recordsToMemberListSchema.parse(listResult.items);
};

export const get = async (id: string): Promise<Member> => {
	const record = await pb
		.collection('members')
		.getOne(id)
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	return recordToMemberSchema.parse(record);
};

export const add = async (data: MemberCreate): Promise<Member> => {
	const record = await pb
		.collection('members')
		.create(data)
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	return recordToMemberSchema.parse(record);
};

export const update = async (data: MemberUpdate): Promise<Member> => {
	const record = await pb
		.collection('members')
		.update(data.id, data)
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	return recordToMemberSchema.parse(record);
};

export const remove = async (id: string): Promise<boolean> => {
	return await pb
		.collection('members')
		.delete(id)
		.catch<boolean>((e: ClientResponseError) => {
			throw e.originalError;
		});
};
