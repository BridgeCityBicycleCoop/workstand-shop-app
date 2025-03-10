<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { BikeEditFields, Message } from '$lib/ui';
	import type { Writable } from 'svelte/store';

	let { data } = $props();
	let bike = $derived(data.bike);

	const { form, errors, enhance, message, delayed, submitting } = superForm(data.form, {
		resetForm: false
	});

	const loading = getContext<Writable<boolean>>('loading-store');
	run(() => {
		$loading = $delayed;
	});
</script>

<section>
	<div>
		<h1>{bike.colour} {bike.make}</h1>
	</div>

	<form id="update-bike" method="POST" use:enhance>
		<BikeEditFields bikeForm={form} {errors} />
	</form>

	<Message message={$message} />

	<div class="buttons">
		<button class="neutral" onclick={() => history.back()}>Back</button>
		<button class="primary" type="submit" data-loading={submitting} form="update-bike"
			>Update</button
		>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
		max-width: 80%;
		margin: auto;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}

	button {
		min-height: 40px;
		margin: 25px 10px;
		padding: 10px 30px;
	}
</style>
