<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	import oldMembers from './oldMembersData.json';
	import members from './newMembersData.json';

	function handleEditMember(key: string, value: string) {
		console.log('kv', key, value);
	}

	function saveEdit() {
		console.log('saving data changes');
	}

	// type Member = {
	//     id: number;
	//     phone: string;
	//     email: string;
	//     email_consent: boolean;
	//     name: string;
	//     preferred_name: string | undefined;
	//     date_of_birth: Date;
	//     guardian_name: string | undefined;
	//     is_active: boolean;
	//     user_id: number;
	//     banned: boolean;
	//     suspended: boolean;
	//     wavier: Date;
	//     created_at: Date;
	//     modified_at: Date;
	//     notes: string;
	//     activities: string[];
	//     logins: Date[];
	// };

	console.log('data', data);
</script>

<div class="card">
	<div>Id: {data.member.id}</div>
	<div>
		Email:
		<span
			on:dblclick={editProp('email', data.member.email)}
			on:keydown={editProp('email', data.member.email)}>{data.member.email}</span
		>
	</div>
	<div>Email Consent: {data.member.email_consent}</div>
	<div>Name: {data.member.name}</div>
	<div>Preferred Name: {data.member.preferred_name}</div>
	<div>DOB: {data.member.date_of_birth}</div>
	<div>Guardian Name: {data.member.guardian_name}</div>
	<div>Phone: {data.member.phone}</div>
	<div>Is Active: {data.member.is_active}</div>
	<div>Banned: {data.member.banned}</div>
	<div>Suspended: {data.member.suspended}</div>
	<div>Waiver Date: {data.member.waiver}</div>
	<div>Created Date: {data.member.created_at}</div>
	<div>Modified Date: {data.member.modified_at}</div>
	<div>Activities: {data.member.activities}</div>
	<div>Login History: {data.member.logins}</div>
	<div>Notes: {data.member.notes}</div>
</div>

<br />

<!-- {#each oldMembers as oldMember}
	<div class="card">
		<div>Id: {olddata.member.id}</div>
		<div>User Id: {olddata.member.user_id}</div>
		<div>Email: {olddata.member.email}</div>
		<div>Email Consent: {olddata.member.email_consent}</div>
		<div>Name: {olddata.member.first_name} {olddata.member.last_name}</div>
		<div>Preferred Name: {olddata.member.preferred_name}</div>
		<div>DOB: {olddata.member.date_of_birth}</div>
		<div>Guardian Name: {olddata.member.guardian_name}</div>
		<div>Phone: {olddata.member.phone}</div>
		<div>Address: {olddata.member.street} {olddata.member.city}, {olddata.member.post_code}</div>
		<div>Province/Country: {olddata.member.province} {olddata.member.country}</div>
		<div>Is Active: {olddata.member.is_active}</div>
		<div>Banned: {olddata.member.banned}</div>
		<div>Suspended: {olddata.member.suspended}</div>
		<div>Waiver Date: {olddata.member.waiver}</div>
		<div>Created Date: {olddata.member.created_at}</div>
		<div>Modified Date: {olddata.member.modified_at}</div>
		<div>Activities: {olddata.member.activities}</div>
		<div>Login History: {olddata.member.logins}</div>
		<div>Notes: {olddata.member.notes}</div>
	</div>
{/each} -->

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
