<script lang="ts">
	import { FilterDataList, getLocaleDisplayDate, getDisplayName } from '$lib/ui';

	export let data;
	const name = 'Visits';
	const headers = ['Name', 'Purpose', 'Signed-in'];
	const list = data.visits.map((visit) => {
		return [getDisplayName(visit.member), visit.purpose.name, getLocaleDisplayDate(visit.date)];
	});
	const startDate = data.startDate;
	const endDate = data.endDate;
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} />
