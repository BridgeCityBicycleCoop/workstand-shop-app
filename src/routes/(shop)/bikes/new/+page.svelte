<script lang="ts">
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { BikeCreateFields, getLocaleDisplayDate, addToast } from '$lib/ui';
	import BikesList from '../+page.svelte';
	import type { Writable } from 'svelte/store';

	export let data;

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
	$: $loading = $delayed;
</script>

<h1>Register New Bike</h1>

<form id="register-bike" method="POST" use:enhance>
	<BikeCreateFields bikeForm={form} {errors} />
	<div class="register-bike-buttons">
		<button class="neutral" type="button" form="register-bike" on:click={() => goto('/bikes')}
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

	.bike-list {
		max-width: 100%;
		margin-top: 5rem;
	}

	.table-wrap {
		overflow-x: scroll;
	}

	/* If we use border,
	we must use table-collapse to avoid
	a slight movement of the header row */
	table {
		border-collapse: collapse;
	}
</style>
