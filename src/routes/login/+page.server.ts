import { loginWithPassword, logout } from '$lib/auth';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8)
});

export const load = async () => {
	// Different schemas, no id required.
	const loginForm = await superValidate(zod(loginSchema));
	const registerForm = await superValidate(zod(registerSchema));

	// Return them both
	return { loginForm, registerForm };
};

export const actions = {
	login: async (event) => {
		const loginForm = await superValidate(event.request, zod(loginSchema));

		if (!loginForm.valid) return fail(400, { loginForm });

		try {
			await loginWithPassword(event, loginForm.data.email, loginForm.data.password);
		} catch (error) {
			if (error instanceof Error) {
				return message(loginForm, error.message, {
					status: 400
				});
			}
			throw error;
		}
		redirect(303, '/shop');
		return { loginForm };
	},

	logout: async (event) => {
		await logout(event);
		redirect(303, '/');
		return { success: true };
	},

	register: async ({ request }) => {
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) return fail(400, { registerForm });

		// TODO: Register user
		return message(registerForm, 'Register form submitted');
	}
};
