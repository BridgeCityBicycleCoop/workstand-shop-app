import type { Member } from '$lib/models';

export const getDisplayName = (member?: Member): string => {
	if (!member) return '';
	return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
};

export const getLocaleDisplayDate = (date: Date | undefined): string => {
	return date ? date.toLocaleString() : '';
};

export const camelCaseToWords = (s: string): string => {
	const result = s.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};
