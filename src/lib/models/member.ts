import z from 'zod';
import { makeOptionalPropsNullable } from './utils';

export const memberSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Name is required'),
	preferredName: z.string().optional(),
	waiver: z.date(),
	status: z.enum(['active', 'suspended', 'banned']),
	email: z.string().optional(),
	pronouns: z.string().optional(),
	emailConsent: z.coerce.boolean(),
	volunteerConsent: z.coerce.boolean(),
	phone: z.string().optional(),
	requiresGuardian: z.coerce.boolean(),
	guardianName: z.string().optional(),
	postalCode: z.string().optional(),
	notes: z.string().optional()
});

export const memberListSchema = z.array(memberSchema);
export const memberCreateSchema = memberSchema
	.omit({ id: true })
	.extend({
		waiver: memberSchema.shape.waiver.default(() => new Date()),
		status: memberSchema.shape.status.default('active')
	})
	.superRefine((data, ctx) => {
		if (!data.email && !data.phone) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Either an email or phone number is required',
				path: ['email']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Either an email or phone number is required',
				path: ['phone']
			});
		}
	});
export const memberUpdateSchema = makeOptionalPropsNullable(
	memberSchema
		.partial()
		.required({ id: true, emailConsent: true, volunteerConsent: true, requiresGuardian: true })
).omit({ waiver: true });

export const memberFilterSchema = memberSchema.omit({ id: true }).partial();

export type Member = z.infer<typeof memberSchema>;
export type MemberList = z.infer<typeof memberListSchema>;
export type MemberCreate = z.infer<typeof memberCreateSchema>;
export type MemberUpdate = z.infer<typeof memberUpdateSchema>;

export type MemberFilter = z.infer<typeof memberFilterSchema>; // Todo: use this in the find method
