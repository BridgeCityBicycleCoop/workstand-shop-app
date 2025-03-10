<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { BikeCreateFields, addToast } from '$lib/ui';
	import BikesList from '../+page.svelte';
	import type { Writable } from 'svelte/store';

	let { data } = $props();

	const { form, errors, enhance, delayed, submitting, message } = superForm(data.form, {
		onUpdated(event) {
			if (event.form.message) {
				addToast({
					type: event.form.valid ? 'success' : 'error',
					message: event.form.message,
					timeout: 3000
				});
			}
		}
	});

	const loading = getContext<Writable<boolean>>('loading-store');
	run(() => {
		$loading = $delayed;
	});
</script>

<h1>Register New Bike</h1>

<form id="register-bike" method="POST" use:enhance>
	<BikeCreateFields bikeForm={form} {errors} />
	<div class="register-bike-buttons">
		<button class="neutral" type="button" form="register-bike" onclick={() => goto('/bikes')}
			>Back</button
		>
		<button class="primary" type="submit" data-loading={$submitting} form="register-bike">
			Register New Bike
		</button>
	</div>
</form>

<BikesList {data} />

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: fit-content;
		margin: auto;
	}
	.register-bike-buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
