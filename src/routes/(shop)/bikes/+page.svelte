<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLocaleDisplayDate } from '$lib/ui';
	import type { FormEventHandler } from 'svelte/elements';
	import type { Bike } from '$lib/models';
	import { page } from '$app/stores';

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

	let searchElement: HTMLInputElement;
	const showBikeSearch = $page.url.pathname === '/bikes';
	let filteredBikeList: Bike[] = data.bikes;
	const handleSearchInput: FormEventHandler<HTMLInputElement> = (event) => {
		const filterText = event.currentTarget?.value.toLocaleLowerCase().trim();

		if (!filterText) {
			filteredBikeList = data.bikes;
			return;
		}

		filteredBikeList = data.bikes.filter((bike) => {
			const color = bike.colour?.toLocaleLowerCase();
			const make = bike.make?.toLocaleLowerCase();

			return (
				color?.match(filterText) || make?.match(filterText) || bike.serialNumber.match(filterText)
			);
		});
	};
</script>

<section class="bike-list">
	{#if showBikeSearch}
		<div class="bike-search">
			<label for="filter">Search:</label>
			<button class="primary" on:click={() => goto('/bikes/new')}>Register New Bike</button>
			<input
				on:input={handleSearchInput}
				name="filter"
				type="search"
				bind:this={searchElement}
				autocomplete="off"
			/>
		</div>
	{/if}

	<h3>Bike List</h3>
	<div class="table-wrap">
		{#if filteredBikeList.length > 0}
			<table>
				<thead>
					<tr>
						<th class="sticky-header">Donation Date</th>
						<th class="sticky-header">Colour/Make</th>
						<th class="sticky-header">Serial Number</th>
						<th class="sticky-header">CPIC Date</th>
						<th class="sticky-header">Suggested Donation</th>
						<th class="sticky-header">Price Paid</th>
						<th class="sticky-header">Bike Destiny</th>
						<th class="sticky-header">Out of Shop Date</th>
						<th class="sticky-header">BCBC Program</th>
						<th class="sticky-header">Recipient Name</th>
						<th class="sticky-header">Recipient Age</th>
						<th class="sticky-header">Recipient Phone</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredBikeList as bike}
						<tr>
							<td>{getLocaleDisplayDate(bike.donationDate)}</td>
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
							<td>{getLocaleDisplayDate(bike.cpicDate)}</td>
							<td>{bike.suggestedDonation}</td>
							<td>{bike.pricePaid}</td>
							<td>{bike.bikeDestiny}</td>
							<td>{getLocaleDisplayDate(bike.outOfShopDate)}</td>
							<td>{bike.bcbcProgram}</td>
							<td>{bike.recipientName}</td>
							<td>{bike.recipientAge}</td>
							<td>{bike.recipientPhoneNumber}</td>
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
	.bike-list {
		max-width: var(--max-width-sm);
		padding-top: 3rem;
	}
	.bike-search {
		display: grid;
		grid-template-columns: 1fr max-content;
		grid-template-areas:
			'label register'
			'search search';
	}
	.bike-search button {
		grid-area: register;
	}
	.bike-search label {
		grid-area: label;
		display: block;
		margin: 30px 0px;
	}
	.bike-search input {
		grid-area: search;
		width: 100%;
	}

	.table-wrap {
		overflow-x: auto;
	}

	/* If we use border,
	we must use table-collapse to avoid
	a slight movement of the header row */
	table {
		border-collapse: collapse;
	}
</style>
