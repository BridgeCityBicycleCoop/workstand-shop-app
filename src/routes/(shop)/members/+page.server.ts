import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { memberCreateSchema } from '$lib/models';
import {
	members as membersService,
	purposes as purposesService,
	visits as visitsService
} from '$lib/server/db';

export const load = async () => {
	const [registerMemberForm, logVisitForm, purposes] = await Promise.all([
		superValidate(zod(memberCreateSchema)),
		superValidate(zod(logVisitFormSchema)),
		purposesService.find()
	]);
	return {
		registerMemberForm,
		logVisitForm,
		purposes
	};
};

export const actions = {
	async registerMember({ request }) {
		const form = await superValidate(request, zod(memberCreateSchema));

		if (!form.valid) return fail(422, { form });
		try {
			const member = await membersService.add(form.data);
			return message(form, { text: 'Member added successfully!', type: 'created', member });
		} catch (err) {
			if (err instanceof Error) {
				return setError(form, '', err.message, { status: 400 });
			}
			return setError(form, '', 'Something went wrong', { status: 500 });
		}
	},
	logVisit: async (event) => {
		const logVisitForm = await superValidate(event.request, zod(logVisitFormSchema));
		if (!logVisitForm.valid) return fail(400, { form: logVisitForm });

		const { memberId, purposeId, visitId } = logVisitForm.data;
		try {
			if (visitId) {
				await visitsService.update({
					id: visitId,
					purposeId,
					memberId
				});
			} else {
				await visitsService.add({ memberId, purposeId });
			}
		} catch (error) {
			if (error instanceof Error) {
				return message(logVisitForm, error.message, {
					status: 400
				});
			}
			throw error;
		}
		return { form: logVisitForm };
	}
};

// NOTE: We are validating the forms with these schemas, not the models schemas
const logVisitFormSchema = z.object({
	memberId: z.string(),
	purposeId: z.string(),
	visitId: z.string().optional()
});
