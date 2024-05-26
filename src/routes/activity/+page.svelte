<script lang="ts">
	import { memberSearchFilter } from '$lib/models/member';
	import { Table } from '$lib/ui';
	export let data;

	let filter = '';
	$: members = memberSearchFilter(data.members, filter);
</script>

<svelte:head>
	<title>Activity SignIn</title>
	<meta name="description" content="Member Activity SignIn" />
</svelte:head>

<div class="text-column">
	<h1>Member Activity SignIn</h1>

	<p>Search for a member, Tap to Select, then choose activities and 'SignIn'</p>

	<label for="memberlist">Search</label>
	<input
		name="memberlist"
		list="membersearch"
		type="text"
		on:input|preventDefault={(e) => {
			filter = e.currentTarget.value;
		}}
	/>
	<datalist id="membersearch">
		{#each data.members as { id, name } (id)}
			<option value={name}>{name}</option>
		{/each}
	</datalist>

	<h3>Members</h3>
	<table>
		<thead>
			<tr>
				<th class="col">Name</th>
				<th class="col">Email</th>
				<th class="col">Phone</th>
				<th class="col">Notes</th>
			</tr></thead
		>
		<tbody>
			{#each members as { id, name, email, phone, notes } (id)}
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
	table {
		width: 100%;
		border-collapse: collapse;
		background-color: white;
	}
	thead {
		border-spacing: 0;

		th {
			border: 1px solid #e9ecef;
			border-bottom: 2px solid #e9ecef;
			vertical-align: bottom;
			text-align: start;
		}
	}
	th,
	td {
		border: 1px solid #e9ecef;
		padding: 0.55rem;
		height: 40px;
	}
	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.03);
	}
</style>
