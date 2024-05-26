import { members as membersService } from '$lib/server/db';

export async function load() {
	const members = membersService.find();
	return {
		members: await members
	};
}
