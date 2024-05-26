<script lang="ts">
	import type { EventHandler } from 'svelte/elements';

	export let data;

	const filterMemberList: EventHandler = (members: any) => {
		console.log('mem list', members);
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
	<input name="memberlist" type="text" on:keydown={filterMemberList(data.members)} />

	<section>
		<h3>Members</h3>
		<ul>
			{#each data.members as { id, name, email, phone, active, banned, suspended, waiver, notes }}
				<li>
					{name} - {email} - {phone} - {active} - {banned} - {suspended} - {waiver} - {@html notes}
				</li>
			{/each}
		</ul>
	</section>
</div>
