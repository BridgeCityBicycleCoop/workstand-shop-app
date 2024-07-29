import { error, redirect } from '@sveltejs/kit';
import { members as membersService } from '$lib/server/db';
import { toValidDateFilters } from '$lib/server/utils/dates';
import { hasEmptyDates, clearEmptyDatesFromURL } from '$lib/utils';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}
	if (hasEmptyDates(url)) {
		redirect(307, clearEmptyDatesFromURL(url).toString());
	}

	const startDate = url.searchParams.get('startDate') || '';
	const endDate = url.searchParams.get('endDate') || '';

	const members = await membersService.findByDate(toValidDateFilters({ startDate, endDate }));

	return { members, startDate, endDate };
};
