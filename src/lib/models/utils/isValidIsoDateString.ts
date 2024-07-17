import { isValid, toDate } from 'date-fns';

export const isValidIsoDateString = (stringDate: string): boolean => {
	return isValid(toDate(stringDate));
};
