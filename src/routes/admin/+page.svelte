<script lang="ts">
	import { FilterDataList, getLocaleDisplayDate, camelCaseToWords } from '$lib/ui';
	import { memberSchema } from '$lib/models';

	export let data;
	const name = 'Members';

	const memberProps = memberSchema.shape;
	type MemberPropKeys = keyof typeof memberProps;
	const memberKeys = (Object.keys(memberProps) as MemberPropKeys[]).filter((key) => key !== 'id');
	const headers = memberKeys.map(camelCaseToWords);
	const list = data.members.map((member) => {
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

	const startDate = data.startDate;
	const endDate = data.endDate;
</script>

<FilterDataList {startDate} {endDate} {name} {headers} {list} />
