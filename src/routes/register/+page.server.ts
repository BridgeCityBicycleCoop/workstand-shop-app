import { memberSchema } from '$lib/models/member';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const superformMemberSchema = zod(memberSchema);

export async function load(event) {
	const form = await superValidate(event, superformMemberSchema);

	return { form };
}

export const actions = {
	async default(event) {
		const request = event.request;
		const form = await superValidate(request, zod(memberSchema));
		const data = form.data;

		try {
			const res = event.locals.pb.collection('members').create(data);
			console.log(res);
		} catch (e) {
			console.log('error', e);
		}
	}
};
