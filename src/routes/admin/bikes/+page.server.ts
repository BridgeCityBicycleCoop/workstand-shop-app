import { error, redirect } from '@sveltejs/kit';
import { bikes as bikesService } from '$lib/server/db';
import { toValidDateFilters } from '$lib/server/utils/dates';
import { hasEmptyUrlParams, clearEmptyUrlParams } from '$lib/utils';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}
	if (hasEmptyUrlParams(url)) {
		redirect(307, clearEmptyUrlParams(url).toString());
	}

	const startDate = url.searchParams.get('startDate') ?? '';
	const endDate = url.searchParams.get('endDate') ?? '';
	const bikes = await bikesService.findByDate(toValidDateFilters({ startDate, endDate }));

	return { bikes, startDate, endDate };
};
