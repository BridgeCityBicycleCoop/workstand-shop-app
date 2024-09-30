import type { Member } from '$lib/models';

export const getDisplayName = (member?: Member): string => {
	if (!member) return '';
	return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
};

export const getLocaleDisplayDate = (date: Date | undefined): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	};

	return date ? date.toLocaleString(undefined, options) : ''; // undefined uses browswer default locale
};

export const camelCaseToWords = (s: string): string => {
	const result = s.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};
