import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { memberCreateSchema } from '$lib/models';
import { members as membersService } from '$lib/server/db';

export async function load() {
	const form = await superValidate(zod(memberCreateSchema));
	form.data.waiver = new Date().toISOString();

	const members = await membersService.find();
	return {
		form: form,
		members: members
	};
}

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(memberCreateSchema));

		if (!form.valid) {
			return message(form, form.errors);
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
