import type { Member } from '$lib/models/member';

export const getDisplayName = (member: Member | undefined): string => {
	if (!member) {
		return '';
	}

	return member?.preferredName ? `${member.name} [${member.preferredName}]` : `${member?.name}`;
};
