/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
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

export type MembersRecord = {
	active?: boolean;
	banned?: boolean;
	email?: string;
	emailConsent?: boolean;
	guardianName?: string;
	name?: string;
	notes?: HTMLString;
	phone?: string;
	postalCode?: string;
	preferredName?: string;
	requiresGuardian?: boolean;
	suspended?: boolean;
	waiver?: IsoDateString;
};

export type PurposesRecord = {
	name: string;
};

export type UsersRecord = {
	avatar?: string;
	name?: string;
};

export type VisitsRecord = {
	date?: IsoDateString;
	memberId: RecordIdString;
	purposeId: RecordIdString;
};

// Response types include system fields and match responses from the PocketBase API
export type MembersResponse<Texpand = unknown> = Required<MembersRecord> &
	BaseSystemFields<Texpand>;
export type PurposesResponse<Texpand = unknown> = Required<PurposesRecord> &
	BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;
export type VisitsResponse<Texpand = unknown> = Required<VisitsRecord> & BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	members: MembersRecord;
	purposes: PurposesRecord;
	users: UsersRecord;
	visits: VisitsRecord;
};

export type CollectionResponses = {
	members: MembersResponse;
	purposes: PurposesResponse;
	users: UsersResponse;
	visits: VisitsResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'members'): RecordService<MembersResponse>;
	collection(idOrName: 'purposes'): RecordService<PurposesResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
	collection(idOrName: 'visits'): RecordService<VisitsResponse>;
};
