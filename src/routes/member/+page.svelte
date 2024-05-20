<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form } = superForm(data.form);

	function mapInputType(val: any) {
		const dataType = Object.prototype.toString.call(val) === '[object Date]' ? 'date' : typeof val;

		switch (dataType) {
			case 'string':
				return 'text';
				break;
			case 'date':
				return 'date';
				break;
			case 'boolean':
				return 'checkbox';
				break;
			default:
				return 'text';
		}
	}

	console.log('data', data);
</script>

<div class="card">
	<form method="POST">
		{#each Object.entries(data.member) as [key, val]}
			<label for={key}>{key}</label>
			<input type={mapInputType(val)} name="key" />
			<br />
		{/each}
		<br />
		<div><button>Submit</button></div>
	</form>
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
