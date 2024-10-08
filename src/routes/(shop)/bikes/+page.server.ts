import { bikes as bikesService } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { hasEmptyUrlParams, clearEmptyUrlParams } from '$lib/utils';

export async function load({ url }) {
	if (hasEmptyUrlParams(url)) {
		redirect(307, clearEmptyUrlParams(url).toString());
	}

	const showAll = url.searchParams.has('showAll') ?? '';
	const filter = showAll ? '' : 'outOfShopDate = ""';

	return {
		bikes: await bikesService.find({ filter }),
		showAll
	};
}
