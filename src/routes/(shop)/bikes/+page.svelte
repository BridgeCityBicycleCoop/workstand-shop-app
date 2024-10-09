<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLocaleDisplayDateAndTime } from '$lib/ui';
	import type { FormEventHandler } from 'svelte/elements';
	import type { Bike } from '$lib/models';
	import { page } from '$app/stores';

	export let data;
	const BIKE_THEFT_URL = 'https://www.cpic-cipc.ca/sbi-rve-eng.htm';

	const handleBikeUpdate = (_event: MouseEvent, bike: Bike) => {
		goto(`/bikes/${bike.id}`);
	};

	$: showBikeButtonText = data.showAll ? 'Show Available Bikes' : 'Show All Bikes';

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

	$: filteredBikeList = data.bikes;
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

<section>
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

	<div class="table-wrap bike-list">
		<div class="bike-list-toolbar">
			<div class="bike-list-heading">Bike List:</div>
			<form class="bike-toggle" method="get">
				<button class="btn btn-tertiary" name="showAll" value={data.showAll ? '' : 'true'}
					>{showBikeButtonText}</button
				>
			</form>
		</div>

		{#if filteredBikeList.length > 0}
			<table>
				<thead>
					<tr>
						<th class="sticky-header">Donation Date</th>
						<th class="sticky-header">Colour/Make (edit bike)</th>
						<th class="sticky-header">Serial Number (cpic site)</th>
						<th class="sticky-header">CPIC Date</th>
						<th class="sticky-header">Suggested Donation</th>
						<th class="sticky-header">Bike Destiny</th>
						<th class="sticky-header">Out of Shop Date</th>
						<th class="sticky-header">BCBC Program</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredBikeList as bike}
						<tr>
							<td>{getLocaleDisplayDateAndTime(bike.donationDate).displayDate}</td>
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
							<td>{getLocaleDisplayDateAndTime(bike.cpicDate).displayDate}</td>
							<td>{bike.suggestedDonation}</td>
							<td>{bike.bikeDestiny}</td>
							<td>{getLocaleDisplayDateAndTime(bike.outOfShopDate).displayDate}</td>
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
	.bike-list {
		padding-top: 1rem;
	}
	.bike-list-toolbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.bike-toggle {
		float: right;
		margin-bottom: 0.25rem;
	}
	.bike-search {
		display: grid;
		grid-template-columns: 1fr max-content;
		grid-template-areas:
			'label register'
			'search search'
			'heading toggle';
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
		max-width: var(--max-width-main);
		border-collapse: collapse;
	}
</style>
