import z from 'zod';

export const purposeSchema = z.object({
	id: z.string(),
	name: z.string(),
	order: z.number().default(0)
});

export const purposeListSchema = z.array(purposeSchema);
export const purposeCreateSchema = purposeSchema.omit({ id: true });
export const purposeUpdateSchema = purposeSchema.partial().required({ id: true });

export const purposeFilterSchema = purposeSchema.omit({ id: true });

export type Purpose = z.infer<typeof purposeSchema>;
export type PurposeList = z.infer<typeof purposeListSchema>;
export type PurposeCreate = z.infer<typeof purposeCreateSchema>;
export type PurposeUpdate = z.infer<typeof purposeUpdateSchema>;

export type PurposeFilter = z.infer<typeof purposeFilterSchema>; // Todo: use this in the find method
