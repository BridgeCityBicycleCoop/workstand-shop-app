import { error, redirect } from '@sveltejs/kit';
import { bikes as bikesService } from '$lib/server/db';
import { toValidEndDate, toValidStartDate } from '$lib/server/utils/dates';
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
	const startPage = url.searchParams.get('page') || '1';
	const urlString = url.toString();
	let page;
	$: page = parseInt(startPage, 10);

	const { bikesList, totalPages } = await bikesService.findByDate({
		startDate: toValidStartDate(startDate),
		endDate: toValidEndDate(endDate),
		page
	});

	return { bikesList, startDate, endDate, page, urlString, totalPages };
};
