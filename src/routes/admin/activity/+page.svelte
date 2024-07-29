<script lang="ts">
	import { FilterDataList, getLocaleDisplayDate, getDisplayName } from '$lib/ui';

	export let data;
	const name = 'Visits';
	const headers = ['Name', 'Purpose', 'Signed-in'];
	$: list = data.visits.map((visit) => {
		return [getDisplayName(visit.member), visit.purpose.name, getLocaleDisplayDate(visit.date)];
	});
	let startDate = data.startDate;
	let endDate = data.endDate;
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} />
