import { redirect } from '@sveltejs/kit';
import { loginWithPassword } from '$lib/auth';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
		if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
			redirect(303, '/login');
		}
		await loginWithPassword(cookies, email, password);
		redirect(303, '/');
	}
} satisfies Actions;
