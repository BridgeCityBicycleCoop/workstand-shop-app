import { getMember } from '$lib/models/member';

export async function load() {
	const member = await getMember(1001);

	return { member };
}
