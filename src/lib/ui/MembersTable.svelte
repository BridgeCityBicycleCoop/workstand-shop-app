<script lang="ts">
	import { memberSearchFilter } from '$lib/models/member';
	import { type Member } from '$lib/models/member';
	import Modal from './Modal.svelte';
	import EditMember from './EditMember.svelte';

	export let members: Member[];

	let filter = '';
	$: filteredMembers = memberSearchFilter(members, filter);

	const searchid = crypto.randomUUID();

	let memberToEdit: Member | undefined;
	function handleEdit(memberId: string) {
		memberToEdit = members.find((m) => m.id === memberId);
	}
	function addActivity(activityId: string, memberId: string) {
		const member = members.find((m) => m.id === memberId);
	}
</script>

<p>Search for a member, Tap to Select, then choose activities and 'SignIn'</p>

<label for={searchid}>Search</label>
<input
	id={searchid}
	name="memberlist"
	list="membersearch"
	type="search"
	on:input|preventDefault={(e) => {
		filter = e.currentTarget.value;
	}}
/>

<div class="wrapper">
	<table>
		<thead>
			<tr>
				<th>Edit</th>
				<th class="col">Name</th>
				<th class="col">Email</th>
				<th class="col">Phone</th>
				<th class="col">Notes</th>
				<th>Activities</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredMembers as { id, name, email, phone, notes } (id)}
				<tr class="row">
					<td><button on:click={() => handleEdit(id)}>Edit</button></td>
					<td class="col">{name}</td>
					<td class="col">{email}</td>
					<td class="col">{phone}</td>
					<td class="col">{@html notes}</td>
					<td>
						<select
							on:change={(e) => {
								addActivity(e.currentTarget.value, id);
								e.currentTarget.value = '';
							}}
						>
							<option value="">Select Activity</option>
							<option value="volunteer">Voluntese should come from the DB</option>
							<option value="fix">Bike fix</option>
							<option value="???">These should come from the DB</option>
						</select>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<Modal bind:member={memberToEdit}>
		<EditMember bind:member={memberToEdit} />
	</Modal>
</div>

<style>
	.wrapper {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		background-color: white;
		margin: 1rem auto;
	}
	thead {
		border-spacing: 0;
	}

	thead th {
		border: 1px solid var(--color-accent-subtle);
		border-bottom: 2px solid var(--color-accent-subtle);
		vertical-align: bottom;
		text-align: start;
	}

	th,
	td {
		border: 1px solid var(--color-accent-subtle);
		padding: 0.55rem;
		height: 40px;
	}
	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.03);
	}
</style>
