import type { Actions } from './$types';

export const actions = {
	login: async (event) => {
		console.log('login', event);
		// TODO log the user in
	},
	register: async (event) => {
		// TODO register the user
		console.log('register', event);
	}
} satisfies Actions;
