<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	// function handleEditMember(key: string, value: string) {
	// 	console.log('kv', key, value);
	// }

	// function saveEdit() {
	// 	console.log('saving data changes');
	// }

	console.log('data', data);
</script>

<div class="card">
	hello
	<!-- <div>Id: {data.member.id}</div> -->
	<!-- <div>
		Email:
		<span
			on:dblclick={editProp('email', data.member.email)}
			on:keydown={editProp('email', data.member.email)}>{data.member.email}</span
		>
	</div> -->
</div>

<style>
	.card {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		gap: 0.5rem;
		flex: 0.1;
	}
</style>
