import z from 'zod';
import { purposeSchema } from './purpose';
import { memberSchema } from './member';

export const visitSchema = z.object({
	id: z.string(),
	member: memberSchema,
	purpose: purposeSchema,
	date: z.date()
});

export const visitListSchema = z.array(visitSchema);
export const visitCreateSchema = z.object({
	memberId: z.string(),
	purposeId: z.string(),
	date: z.date().default(new Date())
});
export const visitUpdateSchema = visitCreateSchema.partial().extend({ id: visitSchema.shape.id });

export const visitFilterSchema = visitSchema.omit({ id: true });

export type Visit = z.infer<typeof visitSchema>;
export type VisitList = z.infer<typeof visitListSchema>;
export type VisitCreate = z.input<typeof visitCreateSchema>;
export type VisitUpdate = z.infer<typeof visitUpdateSchema>;

export type VisitFilter = z.infer<typeof visitFilterSchema>; // Todo: use this in the find method
