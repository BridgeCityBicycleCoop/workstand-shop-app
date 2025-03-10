/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Bikes = "bikes",
	Members = "members",
	Purposes = "purposes",
	Users = "users",
	Visits = "visits",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type BikesRecord = {
	bcbcProgram?: string
	bikeDestiny?: string
	colour?: string
	cpicDate?: IsoDateString
	created?: IsoDateString
	donatedBy?: string
	donationDate?: IsoDateString
	emailAddress?: string
	id: string
	make?: string
	notes?: string
	outOfShopDate?: IsoDateString
	pricePaid?: number
	recipientAge?: string
	recipientName?: string
	recipientPhoneNumber?: string
	serialNumber?: string
	suggestedDonation?: number
	updated?: IsoDateString
}

export enum MembersStatusOptions {
	"active" = "active",
	"suspended" = "suspended",
	"banned" = "banned",
}
export type MembersRecord = {
	created?: IsoDateString
	email?: string
	emailConsent?: boolean
	guardianName?: string
	id: string
	name?: string
	notes?: HTMLString
	phone?: string
	postalCode?: string
	preferredName?: string
	pronouns?: string
	requiresGuardian?: boolean
	status?: MembersStatusOptions
	updated?: IsoDateString
	waiver?: IsoDateString
}

export type PurposesRecord = {
	created?: IsoDateString
	id: string
	name: string
	updated?: IsoDateString
}

export enum UsersRoleOptions {
	"'admin'" = "'admin'",
	"'staff'" = "'staff'",
}
export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email?: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	phone?: string
	role?: UsersRoleOptions
	tokenKey: string
	updated?: IsoDateString
	username: string
	verified?: boolean
}

export type VisitsRecord = {
	created?: IsoDateString
	date?: IsoDateString
	id: string
	memberId: RecordIdString
	purposeId: RecordIdString
	updated?: IsoDateString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type BikesResponse<Texpand = unknown> = Required<BikesRecord> & BaseSystemFields<Texpand>
export type MembersResponse<Texpand = unknown> = Required<MembersRecord> & BaseSystemFields<Texpand>
export type PurposesResponse<Texpand = unknown> = Required<PurposesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VisitsResponse<Texpand = unknown> = Required<VisitsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	bikes: BikesRecord
	members: MembersRecord
	purposes: PurposesRecord
	users: UsersRecord
	visits: VisitsRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	bikes: BikesResponse
	members: MembersResponse
	purposes: PurposesResponse
	users: UsersResponse
	visits: VisitsResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'bikes'): RecordService<BikesResponse>
	collection(idOrName: 'members'): RecordService<MembersResponse>
	collection(idOrName: 'purposes'): RecordService<PurposesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'visits'): RecordService<VisitsResponse>
}
