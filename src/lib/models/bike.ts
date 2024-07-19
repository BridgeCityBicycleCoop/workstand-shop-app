import z from 'zod';
import { makeOptionalPropsNullable } from './utils';
import type { Prettify } from '$lib/utils';

export const bikeSchema = z.object({
	id: z.string(),
	serialNumber: z.string(),
	donationDate: z.date().optional(),
	colour: z.string().optional(),
	make: z.string().optional(),
	donatedBy: z.string().optional(),
	email: z.string().optional(),
	suggestedDonation: z.number().optional(),
	recipientName: z.string().optional(),
	recipientAge: z.string().optional(),
	recipientPhoneNumber: z.string().optional(),
	cpicDate: z.date().optional(),
	outOfShopDate: z.date().optional(),
	pricePaid: z.number().optional(),
	bikeDestiny: z.string().optional(),
	bcbcProgram: z.string().optional(),
	notes: z.string().optional()
});

export const bikeListSchema = z.array(bikeSchema);
export const bikeCreateSchema = bikeSchema.omit({ id: true });
export const bikeUpdateSchema = makeOptionalPropsNullable(
	bikeSchema.partial().required({ id: true, serialNumber: true })
);

export const bikeFilterSchema = bikeSchema.omit({ id: true });

export type Bike = Prettify<z.infer<typeof bikeSchema>>;
export type BikeList = Prettify<z.infer<typeof bikeListSchema>>;
export type BikeCreate = Prettify<z.infer<typeof bikeCreateSchema>>;
export type BikeUpdate = Prettify<z.infer<typeof bikeUpdateSchema>>;

export type BikeFilter = z.infer<typeof bikeFilterSchema>; // Todo: use this in the find method

export const bikeSearchFilter = (bikes: Bike[], filter: string) => {
	return bikes.filter(
		(m) => !filter || m.serialNumber.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);
};
