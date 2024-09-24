import { error, redirect } from '@sveltejs/kit';
import { members as membersService } from '$lib/server/db';
import { toValidStartDate, toValidEndDate } from '$lib/server/utils/dates';
import { hasEmptyUrlParams, clearEmptyUrlParams } from '$lib/utils';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}
	if (hasEmptyUrlParams(url)) {
		redirect(307, clearEmptyUrlParams(url).toString());
	}

	const startDate = url.searchParams.get('startDate') || '';
	const endDate = url.searchParams.get('endDate') || '';
	const page = url.searchParams.get('page') || '1';

	const members = await membersService.findByDate({
		startDate: toValidStartDate(startDate),
		endDate: toValidEndDate(endDate),
		page: parseInt(page, 10)
	});

	const endPage = Math.ceil(members.length / 30);

	return { members, startDate, endDate, page, endPage, url };
};
