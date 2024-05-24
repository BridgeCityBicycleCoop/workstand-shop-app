import type { Member, MemberFilters } from '$lib/models/member';

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

export type MembersService = ResourceService<Member, MemberFilters>;
