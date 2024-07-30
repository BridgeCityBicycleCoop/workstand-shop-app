import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { memberUpdateSchema } from '$lib/models';
import { members as membersService } from '$lib/server/db';

const memberUpdateFormSchema = memberUpdateSchema
	.pick({
		id: true,
		name: true,
		preferredName: true,
		pronouns: true,
		email: true,
		emailConsent: true,
		volunteerConsent: true,
		phone: true,
		requiresGuardian: true,
		guardianName: true,
		postalCode: true,
		notes: true,
		status: true
	})
	.required({ id: true, requiresGuardian: true, emailConsent: true });

export async function load({ params }) {
	const member = await membersService.get(params.id).catch((err) => {
		if (err.status === 404) {
			error(404, 'Not found');
		}
		throw err;
	});

	const form = await superValidate(member, zod(memberUpdateFormSchema));
	return {
		form: form,
		member: member
	};
}

export const actions = {
	async default({ request }) {
		const memberUpdateForm = await superValidate(request, zod(memberUpdateFormSchema));
		if (!memberUpdateForm.valid) return fail(400, { memberUpdateForm });

		try {
			await membersService.update(memberUpdateForm.data);
		} catch (error) {
			if (error instanceof Error) {
				return message(memberUpdateForm, error.message, {
					status: 400
				});
			}
			throw error;
		}
		return message(memberUpdateForm, 'Member updated successfully!');
	}
};
