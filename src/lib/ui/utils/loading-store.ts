import { writable, derived, type Writable, type Readable } from 'svelte/store';

export const loadingStore = <T>(navigatingStore: Readable<T>): Writable<boolean> => {
	const privateStore = writable(false);
	const store = derived([privateStore, navigatingStore], ([$privateStore, $navigatingStore]) => {
		return $privateStore || !!$navigatingStore;
	});

	return {
		set: privateStore.set,
		update: privateStore.update,
		subscribe: store.subscribe
	};
};
