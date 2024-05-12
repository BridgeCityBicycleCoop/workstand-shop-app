<script lang="ts">
	// id should be unique_id
	// user_id should too?
	// all Dates should be Date types
	// booleans convert from 't' or 'f' to boolean type
	// involvemnet array becomes activities array - activities are custom type?
	// activities and logins tracking should be own db table joined via unique_id

	type Member = {
		id: number;
		email: string;
		email_consent: boolean;
		first_name: string;
		last_name: string;
		preferred_name: string | undefined;
		date_of_birth: Date;
		guardian_name: string | undefined;
		phone: string;
		street: string;
		city: string;
		province: string;
		country: string | undefined;
		post_code: string;
		wavier: Date;
		is_active: boolean;
		user_id: number;
		banned: boolean;
		notes: string;
		suspended: boolean;
		created_at: Date;
		modified_at: Date;
		activities: string[];
		login_history: Date[];
	};

	import members from './membersData.json';
</script>

{#each members as member}
	<div class="card">
		<div>Id: {member.id}</div>
		<div>User Id: {member.user_id}</div>
		<div>Email: {member.email}</div>
		<div>Email Consent: {member.email_consent}</div>
		<div>Name: {member.first_name} {member.last_name}</div>
		<div>Preferred Name: {member.preferred_name}</div>
		<div>DOB: {member.date_of_birth}</div>
		<div>Guardian Name: {member.guardian_name}</div>
		<div>Phone: {member.phone}</div>
		<div>Address: {member.street} {member.city}, {member.post_code}</div>
		<div>Province/Country: {member.province} {member.country}</div>
		<div>Is Active: {member.is_active}</div>
		<div>Banned: {member.banned}</div>
		<div>Suspended: {member.suspended}</div>
		<div>Waiver Date: {member.waiver}</div>
		<div>Created Date: {member.created_at}</div>
		<div>Modified Date: {member.modified_at}</div>
		<div>Activities: {member.activities}</div>
		<div>Login History: {member.login_history}</div>
		<div>Notes: {member.notes}</div>
	</div>
{/each}

<style>
	.card {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		gap: 0.5rem;
		flex: 0.1;
	}
</style>
