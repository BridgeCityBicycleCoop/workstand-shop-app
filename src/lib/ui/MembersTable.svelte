<script lang="ts">
	import { memberSearchFilter } from '$lib/models/member';

	export let members;

	let filter = '';
	$: filteredMembers = memberSearchFilter(members, filter);

	const searchid = crypto.randomUUID();
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
				<th class="col">Name</th>
				<th class="col">Email</th>
				<th class="col">Phone</th>
				<th class="col">Notes</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredMembers as { id, name, email, phone, notes } (id)}
				<tr class="row">
					<td class="col">{name}</td>
					<td class="col">{email}</td>
					<td class="col">{phone}</td>
					<td class="col">{@html notes}</td>
				</tr>
			{/each}
		</tbody>
	</table>
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
