import PocketBase from 'pocketbase';
import cookie from 'cookie';
import { redirect, type Cookies } from '@sveltejs/kit';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { AuthModule, AuthHandler } from '../types';

const SESSION_COOKIE_NAME = 'sessionid';

export const loginWithPassword = (async (cookies: Cookies, email: string, password: string) => {
	const pb = new PocketBase(env.POCKETBASE_URL);
	const { token, record } = await pb.collection('users').authWithPassword(email, password);
	pb.authStore.save(token, record);
	const pbAuthCookie = cookie.parse(pb.authStore.exportToCookie());
	cookies.set(SESSION_COOKIE_NAME, pbAuthCookie.pb_auth, {
		path: '/'
	});
}) satisfies AuthModule['loginWithPassword'];

export const authServerHookHandler: AuthHandler =
	({ loginRoute }: { loginRoute: string }) =>
	async ({ event, resolve }) => {
		// if current route is the login page or we are building the app
		// logout (remove the session cookie) and continue
		const isLoginPage: boolean = event.url.pathname === loginRoute;
		if (isLoginPage || building) {
			event.cookies.set(SESSION_COOKIE_NAME, '', { path: '/' });
			return await resolve(event);
		}

		const pb = new PocketBase(env.POCKETBASE_URL);

		// load the store data from the request cookie string
		pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '', SESSION_COOKIE_NAME);
		try {
			if (!pb.authStore.isValid) throw new Error('Session Invalid');
			// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
			const auth = await pb.collection('users').authRefresh<{ id: string; email: string }>();
			event.locals.user = auth.record;
		} catch (_) {
			// clear the auth store on failed refresh
			pb.authStore.clear();
			redirect(303, loginRoute);
		} finally {
			// if the user is not authenticated, redirect to the login page
			if (!event.locals.user) {
				redirect(303, loginRoute);
			}
		}

		const pbAuthCookie = cookie.parse(pb.authStore.exportToCookie());
		// send back the cookie to the client with the latest session value
		event.cookies.set(SESSION_COOKIE_NAME, pbAuthCookie.pb_auth, {
			path: '/'
		});

		return await resolve(event);
	};
