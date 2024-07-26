import { toZonedTime } from 'date-fns-tz';
import { constructNow } from 'date-fns';
import type { IsoDateString } from '../db/pocketbase/types';

const EPOCH = '1970-01-01'; // start of computer time

type StartEndTime = {
	startDateTime: Date;
	endDateTime: Date;
};

export const getStartDate = (dateString: IsoDateString = EPOCH): Date => {
	return new Date(dateString);
};
export const getEndDate = (dateString: IsoDateString = new Date().toISOString()): Date => {
	const endDate = new Date(dateString);
	endDate.setUTCHours(23, 59, 59, 999);

	return endDate;
};

export const getTzConvertedStartEndDates = (
	startDate: Date,
	endDate: Date,
	tz: string = 'UTC'
): StartEndTime => {
	return { startDateTime: toZonedTime(startDate, tz), endDateTime: toZonedTime(endDate, tz) };
};
