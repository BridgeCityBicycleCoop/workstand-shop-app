import { writable } from 'svelte/store';

type Toast = {
	id: string;
	message: string;
	type?: 'success' | 'error' | 'info';
	dismissible?: boolean;
	timeout?: number;
};

export const toasts = writable<Toast[]>([]);

export const addToast = (toast: Omit<Toast, 'id'>) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible or has a timeout.
	const id = crypto.randomUUID();

	const defaults = {
		id,
		type: 'info',
		dismissible: true,
		timeout: 0
	} as const;

	// Push the toast to the top of the list of toasts
	toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

	if (toast.timeout ?? 0 > 0) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: string) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
