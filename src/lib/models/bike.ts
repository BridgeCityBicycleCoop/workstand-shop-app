import z from 'zod';

export const datelikeToDate = z
	.union([z.date(), z.string(), z.number()])
	.transform((value) => (value === '' ? undefined : value))
	.pipe(z.coerce.date().nullish());

enum BikeStatus {
	Active = 'active',
	Sold = 'sold',
	Stolen = 'stolen'
}

export const bikeSchema = z.object({
	id: z.string(),
	serialNumber: z.string().min(1, 'Bike Serial# is required'),
	brand: z.string().optional(),
	model: z.string().optional(),
	style: z.string().optional(),
	color: z.string().optional(),
	price: z.number().optional(),
	notes: z.string().optional(),
	status: z.nativeEnum(BikeStatus) // active, sold, stolen
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
