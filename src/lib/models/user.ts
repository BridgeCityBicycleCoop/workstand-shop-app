import z from 'zod';
import { makeOptionalPropsNullable } from './utils';

export const userSchema = z.object({
	username: z.string(),
	email: z.string(),
	name: z.string().optional(),
	emailVisibility: z.coerce.boolean(),
	role: z.enum(['admin', 'staff']).array().default([]),
	verified: z.coerce.boolean(),
	avatar: z.string().optional()
});

export const userListSchema = z.array(userSchema);
export const userFilterSchema = userSchema.partial();
export const userCreateSchema = userSchema.partial().required({ email: true });
export const userUpdateSchema = makeOptionalPropsNullable(
	userSchema.partial().required({ username: true })
);

export type User = z.infer<typeof userSchema>;
export type UserList = z.infer<typeof userListSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

export type UserFilter = z.infer<typeof userFilterSchema>;
