import { Member, getMember } from '$lib/models/member';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
	const member = await getMember(1001);
	const form = await superValidate(zod(Member));

	return { member, form };
}
