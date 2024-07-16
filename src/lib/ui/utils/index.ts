import type { Member } from '$lib/models';
import type { IsoDateString } from '$lib/server/db/pocketbase/types';
import { formatDate } from 'date-fns';

export const getDisplayName = (member: Member | undefined): string => {
	if (!member) {
		return '';
	}

	return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
};

export const formatStringDate = (stringDate: IsoDateString): string => {
	return stringDate === '' ? 'date not set' : formatDate(stringDate, 'yyyy-mm-dd');
};
