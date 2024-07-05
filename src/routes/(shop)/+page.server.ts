import z from 'zod';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
	members as membersService,
	purposes as purposesService,
	visits as visitsService
} from '$lib/server/db';
import { memberUpdateSchema } from '$lib/models/member';

export async function load() {
	const members = await membersService.find();
	const visits = await visitsService.findTodays();
	const purposes = await purposesService.find();

	const logVisitForm = await superValidate(zod(logVisitFormSchema));
	const memberUpdateForm = await superValidate(zod(memberUpdateSchema));

	return {
		members,
		visits,
		purposes,
		logVisitForm,
		memberUpdateForm
	};
}

export const actions = {
	logVisit: async (event) => {
		const logVisitForm = await superValidate(event.request, zod(logVisitFormSchema));
		if (!logVisitForm.valid) return fail(400, { logVisitForm });

		const { memberId, purposeId, visitId } = logVisitForm.data;
		try {
			if (visitId) {
				await visitsService.update({
					id: visitId,
					purposeId,
					memberId
				});
			} else {
				await visitsService.add({ memberId, purposeId, date: new Date() });
			}
		} catch (error) {
			if (error instanceof Error) {
				return message(logVisitForm, error.message, {
					status: 400
				});
			}
			throw error;
		}
		return { logVisitForm };
	},
	updateMember: async (event) => {
		const memberUpdateForm = await superValidate(event.request, zod(memberUpdateFormSchema));
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
		return { memberUpdateForm };
	}
};

// NOTE: We are validating the forms with these schemas, not the models schemas
const logVisitFormSchema = z.object({
	memberId: z.string(),
	purposeId: z.string(),
	visitId: z.string().optional()
});

// ditto
const memberUpdateFormSchema = memberUpdateSchema.pick({
	id: true,
	name: true,
	preferredName: true,
	pronouns: true,
	email: true,
	emailConsent: true,
	phone: true,
	requiresGuardian: true,
	guardianName: true,
	postalCode: true,
	notes: true,
	status: true
});
