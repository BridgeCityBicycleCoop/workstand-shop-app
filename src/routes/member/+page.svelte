<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// function handleEditMember(key: string, value: string) {
	// 	console.log('kv', key, value);
	// }

	// function saveEdit() {
	// 	console.log('saving data changes');
	// }

	console.log('data', data);
</script>

<div class="card">
	{#each Object.entries(data.member) as [key, val]}
		<div>{key}: <span>{val}</span></div>
	{/each}
</div>

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
