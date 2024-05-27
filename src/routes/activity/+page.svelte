<script lang="ts">
	import { MembersTable } from '$lib/ui';
	export let data;
</script>

<svelte:head>
	<title>Activity SignIn</title>
	<meta name="description" content="Member Activity SignIn" />
</svelte:head>

<div class="text-column">
	<h1>Member Activity SignIn</h1>
	<MembersTable members={data.members} />
</div>

<style>
	.text-column {
		display: flex;
		width: 100%;
		max-width: 48rem;
		flex: 0.2;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
	}
</style>
