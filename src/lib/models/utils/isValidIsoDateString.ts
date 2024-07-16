import { isValid, toDate } from 'date-fns';

export const isValidIsoDateString = (stringDate: string): boolean => {
	const isEmptyString = stringDate === '';
	return isEmptyString || isValid(toDate(stringDate));
};
