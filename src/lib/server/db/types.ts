import type { Member, MemberFilter } from '$lib/models/member';
import type { Visit, VisitFilter } from '$lib/models/visit';
import type { Purpose, PurposeFilter } from '$lib/models/purpose';

interface ResourceService<
	Resource extends { id: unknown },
	Filters extends Record<string, unknown>
> {
	find(filters: Filters, params?: unknown): Promise<Resource[]>;
	get(id: Resource['id'], params?: unknown): Promise<Resource>;
	add(data: Partial<Resource>, params?: unknown): Promise<Resource>;
	update(id: Resource['id'], data: Omit<Resource, 'id'>, params?: unknown): Promise<Resource>;
	remove(id: Resource['id'], params?: unknown): Promise<boolean>;
}

export type MembersService = ResourceService<Member, MemberFilter>;
export type VisitsService = ResourceService<Visit, VisitFilter>;
export type PurposesService = ResourceService<Purpose, PurposeFilter>;
