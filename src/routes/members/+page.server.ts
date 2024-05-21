import { memberSchema } from '$lib/models/member';
import { superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '../member/$types';

const superformMemberSchema = zod(memberSchema);

export async function load(event) {
	const form = await superValidate(event, superformMemberSchema);
	// const form = {};
	// const id = locals.pb.authStore.model?.id;
	// const member = await locals.pb.collection('users').getOne(id, { fetch });

	// console.log('member', member);
	return { form };
}

export const actions: Actions = {
	// register new member
	register: async ({ locals, request }) => {
		const data = request.formData;

		locals.pb.collection('users').create(data);
	},

	// load previous member by id, name, phone number, email?
	preload: async ({ locals, request }) => {},

	// save member edits to db
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
	}
};
