export const hasEmptyDates = (url: URL) => {
	return (
		(url.searchParams.has('startDate') && !url.searchParams.get('startDate')) ||
		(url.searchParams.has('endDate') && !url.searchParams.get('endDate'))
	);
};

export const clearEmptyDatesFromURL = (url: URL) => {
	const newUrl = new URL(url);
	if (!url.searchParams.get('startDate')) {
		newUrl.searchParams.delete('startDate');
	}
	if (!url.searchParams.get('endDate')) {
		newUrl.searchParams.delete('endDate');
	}
	return newUrl;
};
