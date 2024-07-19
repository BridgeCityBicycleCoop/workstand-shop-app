import type {
	Member,
	MemberFilter,
	Visit,
	VisitFilter,
	Purpose,
	PurposeFilter,
	Bike,
	BikeFilter
} from '$lib/models';
import type { Nullable } from '$lib/utils';

interface ResourceService<
	Resource extends { id: unknown },
	Filters extends Record<string, unknown>
> {
	find(filters: Filters): Promise<Resource[]>;
	get(id: Resource['id']): Promise<Resource>;
	add(data: Partial<Resource>): Promise<Resource>;
	update(data: Nullable<Partial<Resource>> & Pick<Resource, 'id'>): Promise<Resource>;
	remove(id: Resource['id']): Promise<boolean>;
}

export type MembersService = ResourceService<Member, MemberFilter>;
export type VisitsService = ResourceService<Visit, VisitFilter> & {
	findByDate(options?: { startDate?: string; endDate?: string }): Promise<Visit[]>;
	add(data: { memberId: string; purposeId: string }): Promise<Visit>;
};
export type PurposesService = ResourceService<Purpose, PurposeFilter>;
export type BikesService = ResourceService<Bike, BikeFilter>;
