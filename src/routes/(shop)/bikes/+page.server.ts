import { bikes as bikesService } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { hasEmptyUrlParams, clearEmptyUrlParams } from '$lib/utils';

export async function load({ url }) {
	if (hasEmptyUrlParams(url)) {
		redirect(307, clearEmptyUrlParams(url).toString());
	}

	const showAll = url.searchParams.has('showAll') && url.searchParams.get('showAll') === 'true';
	const availableFilter = showAll ? {} : { available: true };

	return {
		bikes: await bikesService.find({
			perPage: 2500,
			...availableFilter
		}),
		showAll
	};
}
