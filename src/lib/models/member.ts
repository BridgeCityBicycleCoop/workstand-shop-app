import z from 'zod';

const datelikeToDate = z
	.union([z.number(), z.string(), z.date()])
	.transform((value) => (value === '' ? undefined : value))
	.pipe(z.coerce.date().nullish());

enum MemberStatus {
	Active = 'active',
	Suspended = 'suspended',
	Banned = 'banned'
}

export const memberSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Name is required'),
	preferredName: z.string().optional(),
	pronouns: z.string().optional(),
	email: z.string().optional(),
	emailConsent: z.boolean().optional(),
	phone: z.string().optional(),
	requiresGuardian: z.boolean().optional(),
	guardianName: z.string().optional(),
	postalCode: z.string().optional(),
	notes: z.string().optional(),
	status: z.nativeEnum(MemberStatus),
	waiver: datelikeToDate.optional()
});

export const memberListSchema = z.array(memberSchema);
export const memberFilterSchema = memberSchema.omit({ id: true });
export const memberCreateSchema = memberSchema.omit({ id: true, waiver: true });
export const memberUpdateSchema = memberSchema.partial().required({ id: true });

export type Member = z.infer<typeof memberSchema>;
export type MemberList = z.infer<typeof memberListSchema>;
export type MemberCreate = z.infer<typeof memberCreateSchema>;
export type MemberUpdate = z.infer<typeof memberUpdateSchema>;

export type MemberFilter = z.infer<typeof memberFilterSchema>; // Todo: use this in the find method

export const memberSearchFilter = (members: Member[], filter: string) => {
	return members.filter(
		(m) => !filter || m.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);
};
