import { memberSchema } from '$lib/models/member';
import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

const superformMemberSchema = zod(memberSchema);

export async function load(event) {
	// const member = await getMember(1001);
	const form = await superValidate(event, superformMemberSchema);

	return { form };
}

export const actions: Actions = {
	update: async ({ locals, request }) => {
		const data = await request.formData();

		// remove empty fields
		for (const [key, value] of (await data).entries()) {
			if (value === '') (await data).delete(key);
		}

		const id = locals.pb.authStore.model?.id;
		console.log('id', id, data);

		try {
			await locals.pb.collection('users').update(id, data);
		} catch (e) {
			console.log('error', e);
			return fail(400, { unknown: true });
		}
	},

	register: async ({ locals, request }) => {
		const data = request.formData;
	}
};
