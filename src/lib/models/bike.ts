import z from 'zod';

export const datelikeToDate = z
	.union([z.date(), z.string(), z.number()])
	.transform((value) => (value === '' ? undefined : value))
	.pipe(z.coerce.date().nullish());

export const bikeSchema = z.object({
	id: z.string(),
	serialNumber: z.string(),
	make: z.string().optional(),
	colour: z.string().optional(),
	donatedBy: z.string().optional(),
	email: z.string().optional(),
	donationDate: datelikeToDate.optional(),
	suggestedDonation: z.number().optional(),
	cpicDate: datelikeToDate.optional(),
	recipientName: z.string().optional(),
	recipientAge: z.string().optional(),
	recipientPhoneNumber: z.string().optional(),
	outOfShopDate: datelikeToDate.optional(),
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
