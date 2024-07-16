<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { BikeEditFields, Message } from '$lib/ui';
	import type { Bike } from '$lib/models';
	import { formatStringDate } from '$lib/ui/utils';

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
				/* clipboard successfully set */
			},
			() => {
				console.log('failed to copy to clipboard');
				/* clipboard write failed */
			}
		);
	}

	const { form, errors, enhance, message } = superForm(data.form);
</script>

<div class="bike-page">
	<h1>Register New Bike</h1>

	<div class="form-container">
		<form id="register-bike" method="POST" use:enhance>
			<BikeEditFields bikeForm={form} {errors} />
		</form>
	</div>

	<br />

	<Message {message} />

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
							<td>{formatStringDate(bike.donationDate)}</td>
							<td>{formatStringDate(bike.cpicDate)}</td>
							<td>{formatStringDate(bike.outOfShopDate)}</td>
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
	.bike-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
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

	.register-bike-buttons {
		display: flex;
		justify-content: center;
	}

	.bike-list {
		grid-area: activity;
	}

	/* If we use border,
	we must use table-collapse to avoid
	a slight movement of the header row */
	table {
		border-collapse: collapse;
	}
</style>
