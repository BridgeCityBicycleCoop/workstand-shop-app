import PocketBase, { ClientResponseError } from 'pocketbase';
import { z } from 'zod';
import { toDate } from 'date-fns';
import {
	getStartDate,
	getEndDate,
	getTzConvertedStartEndDates
} from '$lib/server/utils/getTzConvertedStartEndDates';
import { env } from '$env/dynamic/private';
import {
	visitSchema,
	visitListSchema,
	visitCreateSchema,
	type Visit,
	type VisitCreate,
	type VisitUpdate
} from '$lib/models';
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

// no startDate or endDate, all visits,
// startDate only, should end with the latest visit
// endDate only, should start from the very first visit
export const findByDate = async (
	options: { startDate?: string; endDate?: string } = {}
): Promise<Visit[]> => {
	let filter;

	if (!options.startDate && !options.endDate) {
		filter = pb.filter('');
	} else {
		const { startDateTime, endDateTime } = getTzConvertedStartEndDates(
			getStartDate(options.startDate),
			getEndDate(options.endDate),
			'UTC'
		);

		filter = pb.filter('{:startDateTime} <= date && {:endDateTime} >= date', {
			startDateTime,
			endDateTime
		});
	}

	const listResult = await pb
		.collection('visits')
		.getList<VisitWithMemberAndPurpose>(1, 100, {
			filter,
			sort: '-date',
			expand: 'memberId,purposeId'
		})
		.catch((e: ClientResponseError) => {
			throw e.originalError;
		});
	return recordsToVisitListSchema.parse(listResult.items.map(expandMemberAndPurpose));
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
