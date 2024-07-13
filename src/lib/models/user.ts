import z from 'zod';

export const userSchema = z.object({
	username: z.string(),
	email: z.string(),
	name: z.string().optional(),
	emailVisibility: z.boolean(),
	role: z.enum(['admin', 'staff']).array(),
	verified: z.boolean(),
	avatar: z.string().optional()
});

export const userListSchema = z.array(userSchema);
export const userFilterSchema = userSchema.partial();
export const userCreateSchema = userSchema.partial().required({ email: true });
export const userUpdateSchema = userSchema.partial().required({ username: true });

export type User = z.infer<typeof userSchema>;
export type UserList = z.infer<typeof userListSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

export type UserFilter = z.infer<typeof userFilterSchema>;
