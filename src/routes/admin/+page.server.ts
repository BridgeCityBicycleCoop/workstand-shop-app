import { error } from '@sveltejs/kit';
import { members as membersService } from '$lib/server/db';
import { toValidDateFilters } from '$lib/server/utils/dates';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}

	const startDate = url.searchParams.get('startDate') || '';
	const endDate = url.searchParams.get('endDate') || '';

	const members = await membersService.findByDate(toValidDateFilters({ startDate, endDate }));

	return { members, startDate, endDate };
};
