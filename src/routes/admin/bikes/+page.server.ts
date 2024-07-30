import { error } from '@sveltejs/kit';
import { bikes as bikesService } from '$lib/server/db';
import { toValidDateFilters } from '$lib/server/utils/dates';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}

	const startDate = url.searchParams.get('startDate') ?? '';
	const endDate = url.searchParams.get('endDate') ?? '';
	const bikes = await bikesService.findByDate(toValidDateFilters({ startDate, endDate }));

	return { bikes, startDate, endDate };
};
