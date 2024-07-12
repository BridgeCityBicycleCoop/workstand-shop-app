import type { Member, MemberFilter } from '$lib/models/member';
import type { Visit, VisitFilter } from '$lib/models/visit';
import type { Purpose, PurposeFilter } from '$lib/models/purpose';
import type { Bike, BikeFilter } from '$lib/models/bike';

interface ResourceService<
	Resource extends { id: unknown },
	Filters extends Record<string, unknown>
> {
	find(filters: Filters): Promise<Resource[]>;
	get(id: Resource['id']): Promise<Resource>;
	add(data: Partial<Resource>): Promise<Resource>;
	update(data: Partial<Resource>): Promise<Resource>;
	remove(id: Resource['id']): Promise<boolean>;
}

export type MembersService = ResourceService<Member, MemberFilter>;
export type VisitsService = ResourceService<Visit, VisitFilter> & {
	findByDate(options: unknown): Promise<Visit[]>;
	add(data: { memberId: string; purposeId: string }): Promise<Visit>;
};
export type PurposesService = ResourceService<Purpose, PurposeFilter>;
export type BikesService = ResourceService<Bike, BikeFilter>;
