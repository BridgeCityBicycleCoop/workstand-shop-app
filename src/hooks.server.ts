import { sequence } from '@sveltejs/kit/hooks';
import { authServerHookHandler } from '$lib/auth';
import { redirectToClearEmptyUrlParamsHook } from '$lib/utils';

export const handle = sequence(
	authServerHookHandler({ loginRoute: '/login' }),
	redirectToClearEmptyUrlParamsHook
);
