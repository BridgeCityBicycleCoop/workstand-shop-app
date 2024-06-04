import z from 'zod';

export const visitSchema = z.object({
	id: z.string(),
	memberId: z.string(),
	purposeId: z.string(),
	memberName: z.string(),
	purpose: z.string()
});

export const visitListSchema = z.array(visitSchema);
export const visitFilterSchema = visitSchema.omit({ id: true });
export const visitCreateSchema = visitSchema.omit({ id: true });
export const visitUpdateSchema = visitSchema.partial();

export type Visit = z.infer<typeof visitSchema>;
export type VisitList = z.infer<typeof visitListSchema>;
export type VisitCreate = z.infer<typeof visitCreateSchema>;
export type VisitUpdate = z.infer<typeof visitUpdateSchema>;

export type VisitFilter = z.infer<typeof visitFilterSchema>; // Todo: use this in the find method

export const visitSearchFilter = (visits: Visit[], filter: string) => {
	return visits.filter(
		(v) => !filter || v.id.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);
};
