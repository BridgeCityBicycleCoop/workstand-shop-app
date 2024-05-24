import z from 'zod';
const datelikeToDate = z
	.union([z.number(), z.string(), z.date()])
	.transform((value) => (value === '' ? undefined : value))
	.pipe(z.coerce.date().nullish());

export const memberSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Name is required'),
	preferredName: z.string().optional(),
	email: z.string().email().optional(),
	emailConsent: z.boolean().optional(),
	phone: z.string().optional(),
	requiresGuardian: z.boolean().optional(),
	guardianName: z.string().optional(),
	postalCode: z.string().optional(),
	active: z.boolean().optional(),
	banned: z.boolean().optional(),
	suspended: z.boolean().optional(),
	waiver: datelikeToDate.optional(),
	notes: z.string().optional()
	// created: z.date().optional(),
	// updated: z.date().optional()
});

export const memberListSchema = z.array(memberSchema);
export const memberFilterSchema = memberSchema.omit({ id: true });
export const memberCreateSchema = memberSchema.omit({ id: true });
export const memberUpdateSchema = memberSchema.partial();

export type Member = z.infer<typeof memberSchema>;
export type MemberList = z.infer<typeof memberListSchema>;
export type MemberCreate = z.infer<typeof memberCreateSchema>;
export type MemberUpdate = z.infer<typeof memberUpdateSchema>;

export type MemberFilter = z.infer<typeof memberFilterSchema>; // Todo: use this in the find method

export const testMember = {
	id: 1001,
	name: 'Frankfurter N Beans',
	preferredName: 'Frank',
	email: 'frank@beans.com',
	emailConsent: true,
	phone: '3554255555',
	requiresGuardian: false,
	guardianName: 'H.D. Bunns',
	postalCode: 'S7L 0L8',
	active: true,
	banned: false,
	suspended: false,
	waiver: new Date('2016-01-09 00:00:00+00'),
	notes: '',
	created: new Date('2017-05-18 04:27:09.503+00'),
	updated: new Date('2018-02-07 02:36:31.766+00')
};
// TODO: move activities and logins to their own tables for reporting

// activities: ['21cd9799b6', '3a5a719017', '0ebb0b5468', '84309225e7', 'c96d389517'],
// logins: [
// 	new Date('2018-02-07 02:36:31.766+00'),
// 	new Date('2018-02-11 02:53:24.334+00'),
// 	new Date('2018-02-27 04:21:18.658+00')
// ],
