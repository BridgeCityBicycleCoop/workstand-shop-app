import type { Cookies, Handle } from '@sveltejs/kit';
export type SessionToken = Branded<string, 'SessionToken'>;

export interface AuthModule {
	loginWithPassword: (cookies: Cookies, email: string, password: string) => Promise<void>;
}
/**
 * AuthHandler functions must return a function that implements the Handle interface from SvelteKit
 * and are expected to both assign user data to the locals.user property and redirect to the
 * provided login route if the user is not authenticated
 */
export type AuthHandler = (options: { loginRoute: string }) => Handle;
