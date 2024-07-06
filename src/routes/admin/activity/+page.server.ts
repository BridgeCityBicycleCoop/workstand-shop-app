import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.user?.role?.includes('admin')) {
		error(403, 'Not an admin');
	}
};
