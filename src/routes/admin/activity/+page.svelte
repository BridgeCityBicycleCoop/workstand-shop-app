<script lang="ts">
	import { FilterDataList, getLocaleDisplayDateAndTime, getDisplayName } from '$lib/ui';

	export let data;
	$: page = data.page;
	$: totalPages = data.totalPages;
	$: urlString = data.urlString;

	const name = 'Visits';
	const headers = ['Name', 'Purpose', 'Signed-in'];
	$: list = data.visitsList.map((visit) => {
		return [
			getDisplayName(visit.member),
			visit.purpose.name,
			getLocaleDisplayDateAndTime(visit.date).display
		];
	});
	let startDate = data.startDate;
	let endDate = data.endDate;
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} {urlString} {page} {totalPages} />
