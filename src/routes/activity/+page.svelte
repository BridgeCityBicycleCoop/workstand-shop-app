<script lang="ts">
	export let data;

	const filterMemberList = (members: any) => {
		console.log('mem list', members);
	};
</script>

<svelte:head>
	<title>Activity SignIn</title>
	<meta name="description" content="Member Activity SignIn" />
</svelte:head>

<div class="text-column">
	<h1>Member Activity SignIn</h1>

	<p>
		Search for a member, select them from the list, choose their activity or activities for the day,
		and select 'SignIn'.
	</p>

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
