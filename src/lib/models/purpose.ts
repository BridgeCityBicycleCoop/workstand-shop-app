import z from 'zod';

export const purposeSchema = z.object({
	id: z.string(),
	name: z.string()
});

export const purposeListSchema = z.array(purposeSchema);
export const purposeFilterSchema = purposeSchema.omit({ id: true });
export const purposeCreateSchema = purposeSchema.omit({ id: true });
export const purposeUpdateSchema = purposeSchema.partial().required({ id: true });

export type Purpose = z.infer<typeof purposeSchema>;
export type PurposeList = z.infer<typeof purposeListSchema>;
export type PurposeCreate = z.infer<typeof purposeCreateSchema>;
export type PurposeUpdate = z.infer<typeof purposeUpdateSchema>;

export type PurposeFilter = z.infer<typeof purposeFilterSchema>; // Todo: use this in the find method

export const purposeSearchFilter = (purposes: Purpose[], filter: string) => {
	return purposes.filter(
		(p) => !filter || p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);
};
