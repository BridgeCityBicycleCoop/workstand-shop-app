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
	findByDate(options?: { startDate?: Date; endDate?: Date }): Promise<{
		list: Visit[];
		total: number;
		page: number;
		perPage: number;
		totalPages: number;
	}>;
	add(data: { memberId: string; purposeId: string }): Promise<Visit>;
};
export type PurposesService = ResourceService<Purpose, PurposeFilter>;
export type BikesService = {
	find(filters: BikeFilter): Promise<{
		list: Bike[];
		total: number;
		page: number;
		perPage: number;
		totalPages: number;
	}>;
	get(id: Bike['id']): Promise<Bike>;
	add(data: Partial<Bike>): Promise<Bike>;
	update(data: Nullable<Partial<Bike>> & Pick<Bike, 'id'>): Promise<Bike>;
	remove(id: Bike['id']): Promise<boolean>;
};
