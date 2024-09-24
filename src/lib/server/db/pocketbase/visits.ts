import PocketBase, { ClientResponseError } from 'pocketbase';
import { z } from 'zod';
import { toDate } from 'date-fns';
import { env } from '$env/dynamic/private';
import {
	visitSchema,
	visitListSchema,
	visitCreateSchema,
	type Visit,
	type VisitCreate,
	type VisitUpdate
} from '$lib/models';
import { createDateFilter } from './utils';
import type { MembersResponse, PurposesResponse, VisitsResponse, TypedPocketBase } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

type VisitWithMemberAndPurpose = VisitsResponse<{
	memberId: MembersResponse;
	purposeId: PurposesResponse;
}>;

const visitRecordSchema = z.object({ date: z.coerce.date() }).passthrough();
const recordToVisitSchema = visitRecordSchema.pipe(visitSchema);
const visitRecordListSchema = visitRecordSchema.array();
const recordsToVisitListSchema = visitRecordListSchema.pipe(visitListSchema);

export const find = async (_filters: Record<string, unknown> = {}): Promise<Visit[]> => {
	const records = await pb
		.collection('visits')
		.getFullList<VisitWithMemberAndPurpose>(500, { expand: 'memberId,purposeId' })
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	const visits = records.map(expandMemberAndPurpose);
	return recordsToVisitListSchema.parse(visits);
};
export const get = async (id: string): Promise<Visit> => {
	return recordToVisitSchema.parse(
		await pb
			.collection('visits')
			.getOne(id)
			.catch((e: ClientResponseError) => {
				throw e.originalError;
			})
	);
};
export const add = async (data: VisitCreate): Promise<Visit> => {
	const createData = visitCreateSchema.parse(data);
	const result = await pb
		.collection('visits')
		.create<VisitWithMemberAndPurpose>(createData, { expand: 'memberId,purposeId' })
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	return recordToVisitSchema.parse(expandMemberAndPurpose(result));
};
export const update = async (data: VisitUpdate): Promise<Visit> => {
	const result = await pb
		.collection('visits')
		.update<VisitWithMemberAndPurpose>(data.id, data, { expand: 'memberId,purposeId' })
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	return recordToVisitSchema.parse(expandMemberAndPurpose(result));
};

export const remove = async (id: string): Promise<boolean> =>
	await pb
		.collection('visits')
		.delete(id)
		.catch<boolean>((e: ClientResponseError) => {
			throw e.originalError;
		});

interface FindByDateResult {
	visitsList: Visit[];
	totalVisits: number;
	page: number;
	perPage: number;
	totalPages: number;
}
// no startDate or endDate, all visits,
// startDate only, should end with the latest visit
// endDate only, should start from the very first visit
export const findByDate = async ({
	startDate,
	endDate,
	page = 1,
	perPage = 30,
	sortBy = 'date',
	sortDirection = 'descending'
}: {
	startDate?: Date;
	endDate?: Date;
	page?: number;
	perPage?: number;
	sortBy?: string;
	sortDirection?: string;
} = {}): Promise<FindByDateResult> => {
	const filter = createDateFilter('date', { startDate, endDate });
	const ascendOrDescend = sortDirection === 'descending' ? '-' : '+';
	const sortString = ascendOrDescend + sortBy;

	const listResult = await pb
		.collection('visits')
		.getList<VisitWithMemberAndPurpose>(page, perPage, {
			filter,
			sort: sortString,
			expand: 'memberId,purposeId'
		})
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});

	return {
		visitsList: recordsToVisitListSchema.parse(listResult.items.map(expandMemberAndPurpose)),
		totalVisits: listResult.totalItems,
		page: listResult.page,
		perPage: listResult.perPage,
		totalPages: listResult.totalPages
	};
};

const expandMemberAndPurpose = (
	r: VisitsResponse<{
		memberId: MembersResponse;
		purposeId: PurposesResponse;
	}>
) => ({
	id: r.id,
	member: r.expand?.memberId
		? { ...r.expand.memberId, waiver: toDate(r.expand.memberId.waiver) }
		: undefined,
	purpose: r.expand?.purposeId,
	date: r.date
});
