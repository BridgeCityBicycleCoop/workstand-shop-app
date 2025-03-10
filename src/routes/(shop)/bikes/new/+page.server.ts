import { fail } from '@sveltejs/kit';
import z from 'zod';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { bikeCreateSchema } from '$lib/models';
import { bikes as bikesService } from '$lib/server/db';

export async function load({ url }) {
	const showAll = url.searchParams.has('showAll');
	const form = await superValidate(zod(bikeCreateSchema));
	const bikes = await bikesService.find();

	return {
		form: form,
		bikes: bikes,
		showAll
	};
}

const newBikeFormSchema = bikeCreateSchema.extend({
	serialNumber: z.preprocess((v) => (v === '' ? undefined : v), z.string()),
	make: z.preprocess((v) => (v === '' ? undefined : v), z.string()),
	colour: z.preprocess((v) => (v === '' ? undefined : v), z.string())
});

export const actions = {
	async default({ request }) {
		const form = await superValidate(request, zod(newBikeFormSchema));
		if (!form.valid) return fail(422, { form });

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
