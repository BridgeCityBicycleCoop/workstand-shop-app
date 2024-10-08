import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

const pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;
import type { TypedPocketBase } from '../types';

export const createDateFilter = (
	property: string,
	{ startDate, endDate }: { startDate?: Date; endDate?: Date }
) => {
	if (!startDate && !endDate) {
		return pb.filter('');
	} else if (!startDate) {
		return pb.filter(`${property} <= {:endDate}`, { endDate });
	} else if (!endDate) {
		return pb.filter(`${property} >= {:startDate}`, { startDate });
	}
	return pb.filter(`${property} >= {:startDate} && ${property} <= {:endDate}`, {
		startDate,
		endDate
	});
};

export const createPropFilter = (property: string, operand: string, value: unknown) => {
	return pb.filter(`${property} ${operand} ${value}`);
};
