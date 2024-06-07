import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import z from 'zod';
import { members as membersService } from '$lib/server/db';
import { visits as visitsService } from '$lib/server/db';
import { purposes as purposesService } from '$lib/server/db';

const logVisitFormSchema = z.object({
	memberId: z.string(),
	purposeId: z.string()
});

export async function load() {
	const members = await membersService.find();
	const visits = await visitsService.findTodays();
	const purposes = await purposesService.find();

	const logVisitForm = await superValidate(zod(logVisitFormSchema));

	return {
		members,
		visits,
		purposes,
		logVisitForm
	};
}

export const actions = {
	logVisit: async (event) => {
		const logVisitForm = await superValidate(event.request, zod(logVisitFormSchema));
		if (!logVisitForm.valid) return fail(400, { logVisitForm });

		const { memberId, purposeId } = logVisitForm.data;
		try {
			await visitsService.add({ memberId, purposeId, date: new Date() });
		} catch (error) {
			if (error instanceof Error) {
				return message(logVisitForm, error.message, {
					status: 400
				});
			}
			throw error;
		}
		return { logVisitForm };
	}
};
