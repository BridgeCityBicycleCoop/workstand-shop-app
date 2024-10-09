import { redirect, type Handle } from '@sveltejs/kit';

export const isEmpty = (value: unknown) => value === '' || value === null || value === undefined;

export const hasEmptyUrlParams = (url: URL) =>
	[...url.searchParams.entries()].some(([key, value]) => !key.startsWith('/') && isEmpty(value));

export const clearEmptyUrlParams = (url: URL) => {
	const newUrl = new URL(url);

	url.searchParams.forEach((value, key) => {
		if (!key.startsWith('/') && isEmpty(value)) {
			newUrl.searchParams.delete(key);
		}
	});

	return newUrl;
};

/**
 * Removes empty URL parameters from the URL, by redirecting, but since
 * sveltkit form actions can be empty URL params, we need to check if the
 * URL params start with a slash and ignore those ones
 */
export const redirectToClearEmptyUrlParamsHook: Handle = ({ event, event: { url }, resolve }) => {
	if (hasEmptyUrlParams(url)) {
		redirect(307, clearEmptyUrlParams(url).toString());
	}
	return resolve(event);
};
