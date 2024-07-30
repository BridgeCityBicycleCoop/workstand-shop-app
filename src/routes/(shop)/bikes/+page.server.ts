import { bikes as bikesService } from '$lib/server/db';

export async function load() {
	return {
		bikes: await bikesService.find()
	};
}
