import PocketBase, { type AuthRecord } from 'pocketbase';
import cookie from 'cookie';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { TypedPocketBase } from '$lib/server/db/pocketbase/types';
import type { AuthModule, AuthHandler } from '../types';

const SESSION_COOKIE_NAME = 'sessionid';

export const loginWithPassword = (async (event: RequestEvent, email: string, password: string) => {
	const { token, record } = await event.locals.pb
		.collection('users')
		.authWithPassword(email, password);
	event.locals.pb.authStore.save(token, record as AuthRecord);
	const pbAuthCookie = cookie.parse(event.locals.pb.authStore.exportToCookie());
	if (!pbAuthCookie.pb_auth) throw new Error('Failed to create auth cookie');
	event.cookies.set(SESSION_COOKIE_NAME, pbAuthCookie.pb_auth, {
		path: '/'
	});
}) satisfies AuthModule['loginWithPassword'];

export const logout = (async (event: RequestEvent) => {
	event.locals.pb.authStore.clear();
	event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
	event.locals.user = null;
}) satisfies AuthModule['logout'];

export const authServerHookHandler: AuthHandler =
	({ loginRoute }: { loginRoute: string }) =>
	async ({ event, resolve }) => {
		event.locals.pb = new PocketBase(env.POCKETBASE_URL) as TypedPocketBase;

		// load the store data from the request cookie string
		event.locals.pb.authStore.loadFromCookie(
			event.request.headers.get('cookie') || '',
			SESSION_COOKIE_NAME
		);
		try {
			if (!event.locals.pb.authStore.isValid) throw new Error('Session Invalid');
			// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
			const auth = await event.locals.pb.collection('users').authRefresh();
			event.locals.user = auth.record;
		} catch (_) {
			// logout the user if the session is invalid
			logout(event);
		} finally {
			// if the user is not authenticated, redirect to the login page
			if (!event.locals.user && event.url.pathname !== loginRoute) {
				redirect(303, loginRoute);
			}
		}

		return await resolve(event);
	};
