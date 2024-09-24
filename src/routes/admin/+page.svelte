<script lang="ts">
	import { FilterDataList, Pagination, getLocaleDisplayDate, camelCaseToWords } from '$lib/ui';
	import { memberSchema } from '$lib/models';

	export let data;
	const name = 'Members';

	const memberProps = memberSchema.shape;
	type MemberPropKeys = keyof typeof memberProps;
	const memberKeys = (Object.keys(memberProps) as MemberPropKeys[]).filter((key) => key !== 'id');
	const headers = memberKeys.map(camelCaseToWords);
	$: list = data.members.map((member) => {
		return memberKeys.map((key) => {
			const value = member[key];

			if (!value) {
				return '';
			} else if (value instanceof Date) {
				return getLocaleDisplayDate(value);
			} else {
				return value.toString();
			}
		});
	});

	let startDate = data.startDate;
	let endDate = data.endDate;
	let page = data.page;
	let endPage = data.endPage;
	let url = data.url;
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} />
<Pagination {url} {page} end={endPage} />
