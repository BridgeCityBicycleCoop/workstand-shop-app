import { members as membersService } from '$lib/server/db';
import { visits as visitsService } from '$lib/server/db';
import { purposes as purposesService } from '$lib/server/db';

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function load() {
	const members = await membersService.find();
	const visits = await visitsService.find();
	const purposes = await purposesService.find();

	return {
		members,
		visits,
		purposes
	};
}
