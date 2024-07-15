import z from 'zod';
import { purposeSchema } from './purpose';
import { memberSchema } from './member';
import { isValidIsoDateString } from '$lib/models/utils/isValidIsoDateString';

export const visitSchema = z.object({
	id: z.string(),
	member: memberSchema,
	purpose: purposeSchema,
	date: z.string().refine(isValidIsoDateString, 'Not a valid IsoDateString')
});

export const visitListSchema = z.array(visitSchema);
export const visitFilterSchema = visitSchema.omit({ id: true });
export const visitCreateSchema = z.object({
	memberId: z.string(),
	purposeId: z.string(),
	date: z.string().refine(isValidIsoDateString, 'Not a valid IsoDateString')
});
export const visitUpdateSchema = z.intersection(
	visitSchema.pick({ id: true }),
	visitCreateSchema.partial()
);

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
