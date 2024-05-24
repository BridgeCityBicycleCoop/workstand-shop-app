import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { memberCreateSchema } from '$lib/models/member';
import { members as membersService } from '$lib/server/db';

export async function load() {
	const form = superValidate(zod(memberCreateSchema));
	const members = membersService.find();
	return {
		form: await form,
		members: await members
	};
}

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(memberCreateSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await membersService.add(form.data);
			return message(form, 'Member added successfully!');
		} catch (errors) {
			if (
				typeof errors === 'object' &&
				errors !== null &&
				'request' in errors &&
				typeof errors.request === 'object' &&
				errors.request !== null &&
				'status' in errors.request &&
				typeof errors.request.status === 'number'
			) {
				return fail(errors.request.status ?? 500, { errors, form });
			}
			return fail(500, { errors, form });
		}
	}
};
