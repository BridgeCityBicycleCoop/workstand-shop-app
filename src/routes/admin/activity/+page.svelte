<script lang="ts">
	import { FilterDataList, getLocaleDisplayDateAndTime, getDisplayName } from '$lib/ui';

	let { data } = $props();
	let page = $derived(data.page);
	let totalPages = $derived(data.totalPages);
	let urlString = $derived(data.urlString);

	const name = 'Visits';
	const headers = ['Name', 'Purpose', 'Signed-in'];
	let list = $derived(data.visitsList.map((visit) => {
		return [
			getDisplayName(visit.member),
			visit.purpose.name,
			getLocaleDisplayDateAndTime(visit.date).display
		];
	}));
	let startDate = data.startDate;
	let endDate = data.endDate;
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} {urlString} {page} {totalPages} />
