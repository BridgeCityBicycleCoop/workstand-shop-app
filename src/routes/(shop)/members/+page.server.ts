import { fail } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { memberCreateSchema } from '$lib/models';
import { members as membersService } from '$lib/server/db';

export const load = async () => ({
	form: await superValidate(zod(memberCreateSchema))
});

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(memberCreateSchema));

		if (!form.valid) return fail(422, { form });
		try {
			await membersService.add(form.data);
			return message(form, 'Member added successfully!');
		} catch (err) {
			if (err instanceof Error) {
				return setError(form, '', err.message, { status: 400 });
			}
			return setError(form, '', 'Something went wrong', { status: 500 });
		}
	}
};
