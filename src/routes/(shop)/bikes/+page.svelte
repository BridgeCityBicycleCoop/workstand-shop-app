<script lang="ts">
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { BikeCreateFields, Message, getLocaleDisplayDate } from '$lib/ui';
	import type { Bike } from '$lib/models';
	import type { Writable } from 'svelte/store';

	export let data;
	const BIKE_THEFT_URL = 'https://www.cpic-cipc.ca/sbi-rve-eng.htm';

	const handleBikeUpdate = (_event: MouseEvent, bike: Bike) => {
		goto(`/bikes/${bike.id}`);
	};

	const handleCheckSerialNumber = (_event: MouseEvent, bike: Bike) => {
		updateClipboard(bike.serialNumber);

		window.open(BIKE_THEFT_URL, '_blank') || window.location.replace(BIKE_THEFT_URL);
	};

	function updateClipboard(newClip: string) {
		navigator.clipboard.writeText(newClip).then(
			() => {
				console.log('succesfully copied to clipboard');
			},
			() => {
				console.log('failed to copy to clipboard');
			}
		);
	}

	const { form, errors, enhance, message, delayed, submitting } = superForm(data.form);

	const loading = getContext<Writable<boolean>>('loading-store');
	$: $loading = $delayed;
</script>

<h1>Register New Bike</h1>
<Message message={$message} />

<form id="register-bike" method="POST" use:enhance>
	<BikeCreateFields bikeForm={form} {errors} />
	<div class="register-bike-buttons">
		<button class="neutral" type="reset" form="register-bike">Clear</button>
		<button class="primary" type="submit" data-loading={$submitting} form="register-bike">
			Register New Bike
		</button>
	</div>
</form>

<section class="bike-list">
	<h3>Bike List</h3>
	<div class="table-wrap">
		{#if data.bikes.length > 0}
			<table>
				<thead>
					<tr>
						<th class="sticky-header">Colour/Make</th>
						<th class="sticky-header">Serial Number</th>
						<th class="sticky-header">Suggested Donation</th>
						<th class="sticky-header">Price Paid</th>
						<th class="sticky-header">Recipient Name</th>
						<th class="sticky-header">Recipient Phone</th>
						<th class="sticky-header">Recipient Age</th>
						<th class="sticky-header">Bike Destiny</th>
						<th class="sticky-header">Donation Date</th>
						<th class="sticky-header">CPIC Date</th>
						<th class="sticky-header">Out of Shop Date</th>
						<th class="sticky-header">BCBC Program</th>
					</tr>
				</thead>
				<tbody>
					{#each data.bikes as bike}
						<tr>
							<td>
								<button class="link" on:click={(event) => handleBikeUpdate(event, bike)}>
									{bike.colour} / {bike.make}
								</button>
							</td>
							<td>
								<button class="link" on:click={(event) => handleCheckSerialNumber(event, bike)}>
									{bike.serialNumber}
								</button>
							</td>
							<td>{bike.suggestedDonation}</td>
							<td>{bike.pricePaid}</td>
							<td>{bike.recipientName}</td>
							<td>{bike.recipientPhoneNumber}</td>
							<td>{bike.recipientAge}</td>
							<td>{bike.bikeDestiny}</td>
							<td>{getLocaleDisplayDate(bike.donationDate)}</td>
							<td>{getLocaleDisplayDate(bike.cpicDate)}</td>
							<td>{getLocaleDisplayDate(bike.outOfShopDate)}</td>
							<td>{bike.bcbcProgram}</td>
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
