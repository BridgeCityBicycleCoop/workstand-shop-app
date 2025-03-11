import { error } from '@sveltejs/kit';
import { bikes as service } from '$lib/server/db';
import { bikeSchema as schema } from '$lib/models';
import { camelCaseToWords, getLocaleDisplayDateAndTime } from '$lib/ui/utils/formatters';

export async function GET({ locals }) {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}

	type SchemaKey = Exclude<keyof typeof schema.shape, 'id'>;
	const schemaKeys = Object.keys(schema.shape).filter((key) => key !== 'id') as SchemaKey[];
	const headers = schemaKeys.map(camelCaseToWords).join(',');

	const list = await service.find();

	const body = [
		headers,
		...list.map((record) =>
			schemaKeys
				.map((k) =>
					record[k] instanceof Date ? getLocaleDisplayDateAndTime(record[k]).displayDate : record[k]
				)
				.join(',')
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
