import { error, redirect } from '@sveltejs/kit';
import z from 'zod';
import { message, superValidate, fail } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { toValidDateFilters } from '$lib/server/utils/dates';
import { hasEmptyDates, clearEmptyDatesFromURL } from '$lib/utils';


import { visits as visitsService, purposes as purposesService } from '$lib/server/db';

export const load = async ({ locals, url }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}
	if (hasEmptyDates(url)) {
		redirect(307, clearEmptyDatesFromURL(url).toString());
	}

	const startDate = url.searchParams.get('startDate') ?? '';
	const endDate = url.searchParams.get('endDate') ?? '';
	const visits = await visitsService.findByDate(toValidDateFilters({ startDate, endDate }));

	// const filterVisitsForm = await superValidate(zod(filterVisitFormSchema));
	const logVisitForm = await superValidate(zod(logVisitFormSchema));
	const purposes = await purposesService.find();

	return { startDate, endDate, logVisitForm, purposes, visits };
};

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
		return { logVisitForm };
	}
};

// NOTE: We are validating the forms with these schemas, not the models schemas
const logVisitFormSchema = z.object({
	memberId: z.string(),
	purposeId: z.string(),
	visitId: z.string().optional()
});
