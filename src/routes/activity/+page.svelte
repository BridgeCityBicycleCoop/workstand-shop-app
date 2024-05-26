<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	export let data;

	const handleFilterMembers: EventHandler = (e) => {
		console.log('ev', e);
		// console.log('mem list', members);
	};
</script>

<svelte:head>
	<title>Activity SignIn</title>
	<meta name="description" content="Member Activity SignIn" />
</svelte:head>

<div class="text-column">
	<h1>Member Activity SignIn</h1>

	<p>Search for a member, Tap to Select, then choose activities and 'SignIn'</p>

	<label for="memberlist">Search</label>
	<input name="memberlist" type="text" on:keydown|preventDefault={handleFilterMembers} />

	<section>
		<h3>Members</h3>

		<header>
			<div class="col">Name</div>
			<div class="col">Email</div>
			<div class="col">Phone</div>
			<div class="col">Active</div>
			<div class="col">Banned</div>
			<div class="col">Waiver</div>
			<div class="col">Notes</div>
		</header>
		{#each data.members as { id, name, email, phone, active, banned, suspended, waiver, notes }}
			<div class="row">
				<div class="col">{name}</div>
				<div class="col">{email}</div>
				<div class="col">{active}</div>
				<div class="col">{banned}</div>
				<div class="col">{suspended}</div>
				<div class="col">{waiver}</div>
				<div class="col">{notes}</div>
			</div>
		{/each}
	</section>
</div>

<style>
	section {
		display: table;
		width: 100%;
	}

	section > * {
		display: table-row;
	}

	section .col {
		display: table-cell;
	}
</style>
