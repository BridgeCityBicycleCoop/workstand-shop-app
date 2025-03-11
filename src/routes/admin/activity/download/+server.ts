import { error } from '@sveltejs/kit';
import { formatISO } from 'date-fns';
import { visits as visitsService } from '$lib/server/db';
import { getDisplayName } from '$lib/ui/utils';

export async function GET({ locals }) {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}

	const list = await visitsService.find();
	const headers = 'Member,Purpose,Date';
	const body = [
		headers,
		...list.map((record) =>
			[getDisplayName(record.member), record.purpose.name, formatISO(record.date)].join(',')
		)
	].join('\n');

	return new Response(body, {
		status: 200,
		headers: {
			'Content-type': 'text/csv; charset=utf-8',
			'Content-Disposition': 'attachment'
		}
	});
}
