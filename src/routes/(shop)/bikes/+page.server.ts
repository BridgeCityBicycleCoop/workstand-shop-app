import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { bikeCreateSchema } from '$lib/models/bike.js';
import { bikes as bikesService } from '$lib/server/db';

export async function load({ params }) {
	const form = await superValidate(zod(bikeCreateSchema));

	const bikes = await bikesService.find();

	return {
		form: form,
		bikes: bikes
	};
}

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(bikeCreateSchema));

		if (!form.valid) {
			return message(form, form.errors);
		}
		try {
			await bikesService.add(form.data);
			return message(form, 'Bike added successfully!');
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
