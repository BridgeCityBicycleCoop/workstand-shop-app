import { error } from '@sveltejs/kit';
import { members as membersService } from '$lib/server/db';
import { toValidStartDate, toValidEndDate } from '$lib/server/utils/dates';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}

	const startDate = url.searchParams.get('startDate') || '';
	const endDate = url.searchParams.get('endDate') || '';
	const startPage = url.searchParams.get('page') || '1';
	const urlString = url.toString();
	const page = parseInt(startPage, 10);

	const { membersList, totalPages } = await membersService.findByDate({
		startDate: toValidStartDate(startDate),
		endDate: toValidEndDate(endDate),
		page
	});

	return { membersList, totalPages, page, startDate, endDate, urlString };
};
