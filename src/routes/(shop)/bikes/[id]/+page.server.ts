import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { bikeUpdateSchema } from '$lib/models';
import { bikes as bikesService } from '$lib/server/db';

const bikeUpdateFormSchema = bikeUpdateSchema.pick({
	id: true,
	serialNumber: true,
	make: true,
	colour: true,
	donatedBy: true,
	email: true,
	donationDate: true,
	suggestedDonation: true,
	cpicDate: true,
	recipientName: true,
	recipientAge: true,
	recipientPhoneNumber: true,
	outOfShopDate: true,
	pricePaid: true,
	bikeDestiny: true,
	bcbcProgram: true,
	notes: true
});

export async function load({ params }) {
	const bike = await bikesService.get(params.id).catch((err) => {
		if (err.status === 404) {
			error(404, 'Not found');
		}
		throw err;
	});

	const form = await superValidate(bike, zod(bikeUpdateFormSchema));
	return {
		form: form,
		bike: bike
	};
}

export const actions = {
	async default({ request }) {
		const bikeUpdateForm = await superValidate(request, zod(bikeUpdateFormSchema));
		if (!bikeUpdateForm.valid) return fail(400, { bikeUpdateForm });

		try {
			await bikesService.update(bikeUpdateForm.data);
			return message(bikeUpdateForm, 'Bike updated successfully!');
		} catch (error) {
			if (error instanceof Error) {
				return message(bikeUpdateForm, error.message, {
					status: 400
				});
			}
			throw error;
		}
		return { form: bikeUpdateForm };
	}
};
