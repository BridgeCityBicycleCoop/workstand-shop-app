import z from 'zod';
import { isValidIsoDateString } from '$lib/models/utils/isValidIsoDateString';

export const bikeSchema = z.object({
	id: z.string(),
	donationDate: z.string().refine(isValidIsoDateString, 'Not a valid IsoDateString').optional(),
	colour: z.string().optional(),
	make: z.string().optional(),
	serialNumber: z.string(),
	donatedBy: z.string().optional(),
	email: z.string().optional(),
	suggestedDonation: z.number().optional(),
	recipientName: z.string().optional(),
	recipientAge: z.string().optional(),
	recipientPhoneNumber: z.string().optional(),
	cpicDate: z.string().refine(isValidIsoDateString, 'Not a valid IsoDateString').optional(),
	outOfShopDate: z.string().refine(isValidIsoDateString, 'Not a valid IsoDateString').optional(),
	pricePaid: z.number().optional(),
	bikeDestiny: z.string().optional(),
	bcbcProgram: z.string().optional(),
	notes: z.string().optional()
});

export const bikeListSchema = z.array(bikeSchema);
export const bikeFilterSchema = bikeSchema.omit({ id: true });
export const bikeCreateSchema = bikeSchema.omit({ id: true });
export const bikeUpdateSchema = bikeSchema.partial().required({ id: true });

export type Bike = z.infer<typeof bikeSchema>;
export type BikeList = z.infer<typeof bikeListSchema>;
export type BikeCreate = z.infer<typeof bikeCreateSchema>;
export type BikeUpdate = z.infer<typeof bikeUpdateSchema>;

export type BikeFilter = z.infer<typeof bikeFilterSchema>; // Todo: use this in the find method

export const bikeSearchFilter = (bikes: Bike[], filter: string) => {
	return bikes.filter(
		(m) => !filter || m.serialNumber.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);
};
