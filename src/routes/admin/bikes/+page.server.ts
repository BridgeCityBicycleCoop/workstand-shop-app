import { error } from '@sveltejs/kit';
import { bikes as bikesService } from '$lib/server/db';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}

	// grab start and end date from params
	const startDate = url.searchParams.get('startDate') || '';
	const endDate = url.searchParams.get('endDate') || '';
	// create the options obj
	const filterOptions = { startDate, endDate };

	const bikes = await bikesService.findByDate(filterOptions);

	return { bikes, startDate, endDate };
};
