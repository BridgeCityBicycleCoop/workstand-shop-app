<script lang="ts">
	import { formatDistance } from 'date-fns';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import BikeEditFields from '$lib/ui/forms/BikeEditFields.svelte';
	import type { Bike } from '$lib/models/bike.js';

	export let data;

	const handleBikeUpdate = (_event: MouseEvent, bike: Bike) => {
		goto(`/bikes/${bike.id}`);
	};

	const { form, errors, enhance, message } = superForm(data.form);
</script>

<div class="bike-page">
	<div>
		<h1>Register New Bike</h1>
		<div class="serial-search">
			<a href="https://www.cpic-cipc.ca/sbi-rve-eng.htm" target="_blank"
				>Search Bike Serial Number</a
			>
		</div>
	</div>

	<div class="form-container">
		<form id="register-bike" method="POST" use:enhance>
			<BikeEditFields bikeForm={form} {errors} />
		</form>
	</div>

	<br />
	{#if $message}
		<div class="message-container">
			{#if typeof $message === 'string'}
				<div class="message">{$message}</div>
			{:else}
				{#each Object.entries($message) as [key, val]}
					<div class="message">ERROR: {val}</div>
				{/each}
			{/if}
		</div>
	{/if}

	<br />
	<div class="register-bike-buttons">
		<button class="btn btn-primary" type="reset" form="register-bike">Cancel Registration</button>
		<button class="btn btn-primary" type="submit" form="register-bike"
			>Click to Register New Bike</button
		>
	</div>
</div>

<section class="bike-list">
	<h3>Bike List</h3>
	<div class="tableWrap">
		{#if data.bikes.length > 0}
			<table>
				<thead>
					<tr>
						<th class="sticky-header">Serial Number</th>
						<th class="sticky-header">Colour</th>
						<th class="sticky-header">Make</th>
					</tr>
				</thead>
				<tbody>
					{#each data.bikes as bike}
						<tr>
							<td>
								<button class="edit-profile" on:click={(event) => handleBikeUpdate(event, bike)}
									>{bike.serialNumber}
								</button>
							</td>
							<td>{bike.colour}</td>
							<td>{bike.make}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>No bikes found</p>
		{/if}
	</div>
</section>

<style>
	.bike-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
	}

	.serial-search {
		display: flex;
		justify-content: center;
		margin: 20px 0px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	form {
		display: grid;
		grid-template-columns: max-content max-content;
		grid-gap: 5px;
	}

	.message-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.message {
		font-weight: bold;
		color: rebeccapurple;
	}

	form label {
		text-align: left;
	}

	form label:after {
		content: ':';
	}

	input {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.register-bike-buttons {
		display: flex;
		justify-content: center;
	}

	button {
		min-height: 40px;
		margin: 25px 10px;
		padding: 10px 30px;
	}

	.bike-list {
		grid-area: activity;
	}
</style>
