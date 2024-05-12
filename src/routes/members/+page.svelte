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
		logins: Date[];
	};

	import members from './membersData.json';
</script>

{#each members as member}
	<div class="card">
		<div>Id: {member.id}</div>
		<div>Name: {member.name}</div>
		<div>Address: {member.address}</div>
		<div>IsMember: {member.isMember}</div>
		<div>Activities: {member.activities}</div>
		<div>Login History: {member.logins}</div>
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
