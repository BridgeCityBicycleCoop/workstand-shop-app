/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Bikes = 'bikes',
	Members = 'members',
	Purposes = 'purposes',
	Users = 'users',
	Visits = 'visits'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString;
	created: IsoDateString;
	updated: IsoDateString;
	collectionId: string;
	collectionName: Collections;
	expand?: T;
};

export type AuthSystemFields<T = never> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type BikesRecord = {
	bcbcProgram?: string;
	bikeDestiny?: string;
	colour?: string;
	cpicDate?: IsoDateString;
	donatedBy?: string;
	donationDate?: IsoDateString;
	emailAddress?: string;
	make?: string;
	notes?: string;
	outOfShopDate?: IsoDateString;
	pricePaid?: number;
	recipientAge?: string;
	recipientName?: string;
	recipientPhoneNumber?: string;
	serialNumber?: string;
	suggestedDonation?: number;
};

export enum MembersStatusOptions {
	'active' = 'active',
	'suspended' = 'suspended',
	'banned' = 'banned'
}
export type MembersRecord = {
	waiver?: IsoDateString;
	email?: string;
	emailConsent?: boolean;
	guardianName?: string;
	name?: string;
	notes?: HTMLString;
	phone?: string;
	postalCode?: string;
	preferredName?: string;
	pronouns?: string;
	requiresGuardian?: boolean;
	status?: MembersStatusOptions;
};

export type PurposesRecord = {
	name: string;
};

export enum UsersRoleOptions {
	'admin' = 'admin',
	'staff' = 'staff'
}
export type UsersRecord = {
	avatar?: string;
	name?: string;
	phone?: string;
	role?: UsersRoleOptions[];
};

export type VisitsRecord = {
	date?: IsoDateString;
	memberId: RecordIdString;
	purposeId: RecordIdString;
};

// Response types include system fields and match responses from the PocketBase API
export type BikesResponse<Texpand = unknown> = Required<BikesRecord> & BaseSystemFields<Texpand>;
export type MembersResponse<Texpand = unknown> = Required<MembersRecord> &
	BaseSystemFields<Texpand>;
export type PurposesResponse<Texpand = unknown> = Required<PurposesRecord> &
	BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;
export type VisitsResponse<Texpand = unknown> = Required<VisitsRecord> & BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	bikes: BikesRecord;
	members: MembersRecord;
	purposes: PurposesRecord;
	users: UsersRecord;
	visits: VisitsRecord;
};

export type CollectionResponses = {
	bikes: BikesResponse;
	members: MembersResponse;
	purposes: PurposesResponse;
	users: UsersResponse;
	visits: VisitsResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'bikes'): RecordService<BikesResponse>;
	collection(idOrName: 'members'): RecordService<MembersResponse>;
	collection(idOrName: 'purposes'): RecordService<PurposesResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
	collection(idOrName: 'visits'): RecordService<VisitsResponse>;
};
