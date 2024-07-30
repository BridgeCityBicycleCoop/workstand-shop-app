import { startOfDay, endOfDay, parse, isValid } from 'date-fns';

export const toValidDateFilters = ({
	startDate,
	endDate
}: {
	startDate?: string | null;
	endDate?: string | null;
}): { startDate?: Date; endDate?: Date } => {
	const parsedStartDate = parse(startDate ?? '', 'yyyy-MM-dd', new Date());
	const parsedEndDate = parse(endDate ?? '', 'yyyy-MM-dd', new Date());

	return {
		startDate: isValid(parsedStartDate) ? startOfDay(parsedStartDate) : undefined,
		endDate: isValid(parsedEndDate) ? endOfDay(parsedEndDate) : undefined
	};
};
