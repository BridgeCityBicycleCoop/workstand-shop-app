import { isValid, toDate } from 'date-fns';

export const isIsoDateString = (dateString: string): boolean => {
	const d = toDate(dateString);
	return isValid(d) && d.toISOString() === dateString;
};
