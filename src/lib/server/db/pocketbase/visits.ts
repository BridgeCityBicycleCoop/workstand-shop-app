import PocketBase from 'pocketbase';
import { constructNow, startOfToday } from 'date-fns';
import { env } from '$env/dynamic/private';
import {
	visitSchema,
	visitListSchema,
	type VisitCreate,
	type VisitUpdate
} from '$lib/models/visit';
import type { MembersResponse, PurposesResponse, VisitsResponse, TypedPocketBase } from './types';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

export const find = async (_filters: Record<string, unknown> = {}) => {
	const records = await pb
		.collection('visits')
		.getFullList<
			VisitsResponse<{ memberId: MembersResponse; purposeId: PurposesResponse }>
		>(500, { expand: 'memberId,purposeId' });
	const visits = records.map((r) => ({
		id: r.id,
		member: r.expand?.memberId,
		purpose: r.expand?.purposeId,
		date: r.date
	}));
	return visitListSchema.parse(visits);
};
export const get = async (id: string) => {
	return visitSchema.parse(await pb.collection('visits').getOne(id));
};
export const add = async (data: VisitCreate) => {
	return visitSchema.parse(await pb.collection('visits').create(data));
};
export const update = async (id: string, data: VisitUpdate) => {
	return visitSchema.parse(await pb.collection('visits').update(id, data));
};
export const remove = async (id: string) => {
	return await pb.collection('visits').delete(id);
};

export const findTodays = async () => {
	const listResult = await pb
		.collection('visits')
		.getList<VisitsResponse<{ memberId: MembersResponse; purposeId: PurposesResponse }>>(1, 100, {
			filter: pb.filter('{:endDateTime} >= date && {:startDateTime} <= date', {
				startDateTime: startOfToday(),
				endDateTime: constructNow(new Date())
			}),
			expand: 'memberId,purposeId'
		});
	const visits = listResult.items.map((r) => ({
		id: r.id,
		member: r.expand?.memberId,
		purpose: r.expand?.purposeId,
		date: r.date
	}));
	return visitListSchema.parse(visits);
};
