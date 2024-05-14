import { sequence } from '@sveltejs/kit/hooks';
import { authServerHookHandler } from '$lib/auth';

export const handle = sequence(authServerHookHandler({ loginRoute: '/login' }));
