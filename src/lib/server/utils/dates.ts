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

export const toValidStartDate = (startDate: string | null | undefined): Date | undefined => {
	const parsedStartDate = parse(startDate ?? '', 'yyyy-MM-dd', new Date());
	return isValid(parsedStartDate) ? startOfDay(parsedStartDate) : undefined;
};

export const toValidEndDate = (endDate: string | null | undefined): Date | undefined => {
	const parsedEndDate = parse(endDate ?? '', 'yyyy-MM-dd', new Date());
	return isValid(parsedEndDate) ? startOfDay(parsedEndDate) : undefined;
};
