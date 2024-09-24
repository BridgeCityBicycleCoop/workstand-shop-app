export const isEmpty = (value: unknown) => value === '' || value === null || value === undefined;

export const hasEmptyUrlParams = (url: URL) => [...url.searchParams.values()].some(isEmpty);

export const clearEmptyUrlParams = (url: URL) => {
	const newUrl = new URL(url);

	url.searchParams.forEach((value, key) => {
		if (isEmpty(value)) {
			newUrl.searchParams.delete(key);
		}
	});

	return newUrl;
};
