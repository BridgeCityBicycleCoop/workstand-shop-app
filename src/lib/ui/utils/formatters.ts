import type { Member } from '$lib/models';
import type { IsoDateString } from '$lib/server/db/pocketbase/types';
import { shopConfig } from '../../../shop_config';

export const getDisplayName = (member?: Member): string => {
	if (!member) return '';
	return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
};

export const camelCaseToWords = (s: string): string => {
	const result = s.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};

export const isValidTimeZone = (tz: string): boolean => {
	if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
		throw new Error('Time zones are not available in this environment');
	}

	try {
		Intl.DateTimeFormat(undefined, { timeZone: tz });
		return true;
	} catch (ex) {
		console.log('invalid IANA TimeZone String', tz);
		return false;
	}
};

interface DisplayDateAndTimeResult {
	display: IsoDateString;
	displayDate: IsoDateString;
	displayTime: IsoDateString;
}
export const getLocaleDisplayDateAndTime = (date: Date | undefined): DisplayDateAndTimeResult => {
	// toLocaleString will use browser defaults for `locale` and/or `timeZone` if undefined
	const locale = shopConfig.locale ? shopConfig.locale : undefined;
	const timeZone = isValidTimeZone(shopConfig.timeZone) ? shopConfig.timeZone : undefined;

	const dateOptions: Intl.DateTimeFormatOptions = {
		timeZone,
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	};

	const timeOptions: Intl.DateTimeFormatOptions = {
		timeZone,
		hour: 'numeric',
		minute: 'numeric'
	};

	const displayDate = date ? date.toLocaleString(locale, dateOptions) : '';
	const displayTime = date ? date.toLocaleString(locale, timeOptions) : '';
	const display = `${displayDate} ${displayTime}`;

	return { display, displayDate, displayTime };
};
