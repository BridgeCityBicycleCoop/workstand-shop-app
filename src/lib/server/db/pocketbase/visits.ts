import PocketBase from 'pocketbase';
import { constructNow, startOfToday } from 'date-fns';
import { env } from '$env/dynamic/private';
import {
	visitSchema,
	visitListSchema,
	type VisitCreate,
	type VisitUpdate
} from '$lib/models/visit';
import type {
	MembersResponse,
	PurposesResponse,
	VisitsResponse,
	TypedPocketBase,
	IsoDateString
} from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

type VisitWithMemberAndPurpose = VisitsResponse<{
	memberId: MembersResponse;
	purposeId: PurposesResponse;
}>;

export const find = async (_filters: Record<string, unknown> = {}) => {
	const records = await pb
		.collection('visits')
		.getFullList<VisitWithMemberAndPurpose>(500, { expand: 'memberId,purposeId' });
	const visits = records.map(expandMemberAndPurpose);
	return visitListSchema.parse(visits);
};
export const get = async (id: string) => {
	return visitSchema.parse(await pb.collection('visits').getOne(id));
};
export const add = async (data: VisitCreate) => {
	const result = await pb
		.collection('visits')
		.create<VisitWithMemberAndPurpose>(data, { expand: 'memberId,purposeId' });
	return visitSchema.parse(expandMemberAndPurpose(result));
};
export const update = async (data: VisitUpdate) => {
	const result = await pb
		.collection('visits')
		.update<VisitWithMemberAndPurpose>(data.id, data, { expand: 'memberId,purposeId' });
	return visitSchema.parse(expandMemberAndPurpose(result));
};
export const remove = async (id: string) => {
	return await pb.collection('visits').delete(id);
};

// defaults to today/recent list
export const findByDate = async (startDate?: IsoDateString, endDate?: IsoDateString) => {
	const startDateTime = startDate ? new Date(startDate) : startOfToday();
	const endDateTime = endDate ? new Date(endDate) : constructNow(new Date());

	const listResult = await pb.collection('visits').getList<VisitWithMemberAndPurpose>(1, 100, {
		filter: pb.filter('{:endDateTime} >= date && {:startDateTime} <= date', {
			startDateTime,
			endDateTime
		}),
		sort: '-date',
		expand: 'memberId,purposeId'
	});
	return visitListSchema.parse(listResult.items.map(expandMemberAndPurpose));
};

const expandMemberAndPurpose = (
	r: VisitsResponse<{
		memberId: MembersResponse;
		purposeId: PurposesResponse;
	}>
) => ({
	id: r.id,
	member: r.expand?.memberId,
	purpose: r.expand?.purposeId,
	date: r.date
});
