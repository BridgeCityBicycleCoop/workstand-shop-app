import type { Member } from '$lib/models';
import type { IsoDateString } from '$lib/server/db/pocketbase/types';
import { intlFormat } from 'date-fns';

export const getDisplayName = (member: Member | undefined): string => {
	if (!member) {
		return '';
	}

	return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
};

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale

export const getLocaleDisplayDate = (
	stringDate: IsoDateString | undefined,
	formatOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}
): string => {
	// pull locale from browser
	const locale = navigator.languages[0] || navigator.language || 'en-US';
	// intlFormat requires a Date object
	return !stringDate ? '' : intlFormat(stringDate, formatOptions, { locale });
};
