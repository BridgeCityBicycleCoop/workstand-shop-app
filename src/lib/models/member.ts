import z from 'zod';
import { isValidIsoDateString } from '$lib/models/utils/isValidIsoDateString';

export const requireEmailOrPhone = z.union(
	[
		z.object({ email: z.undefined(), phone: z.string() }),
		z.object({ email: z.string(), phone: z.undefined() }),
		z.object({ email: z.string(), phone: z.string() })
	],
	{ errorMap: (_issue, _ctx) => ({ message: 'Either email or phone must be filled in' }) }
);

enum MemberStatus {
	Active = 'active',
	Suspended = 'suspended',
	Banned = 'banned'
}

export const memberSchema = z.object({
	id: z.string(),
  waiver: z.string().refine(isValidIsoDateString, 'Not a valid IsoDateString').nullish(),
	name: z.string().min(1, 'Name is required'),
	preferredName: z.string().nullish(),
	pronouns: z.string().nullish(),
	email: z.string().nullish(),
	emailConsent: z.boolean().default(false),
	phone: z.string().nullish(),
	requiresGuardian: z.boolean().default(false),
	guardianName: z.string().nullish(),
	postalCode: z.string().nullish(),
	notes: z.string().nullish(),
	status: z.nativeEnum(MemberStatus), // active, suspended, banned
});

export const memberListSchema = z.array(memberSchema);
export const memberFilterSchema = memberSchema.omit({ id: true });
export const memberCreateSchema = memberSchema.omit({ id: true }).required({ email: true }); // currently require email
export const memberUpdateSchema = memberSchema.required({ id: true });

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
