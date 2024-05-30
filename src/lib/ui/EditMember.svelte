<script lang="ts">
	import { memberCreateSchema, type Member } from '$lib/models/member';

	export let activeMember: Member | null = null;
</script>

{#if activeMember}<div>Edit {activeMember.name}'s Info</div>
	<br />
	<div class="form-container">
		<form method="dialog">
			<label for="name">Name</label>
			<input type="text" name="name" bind:value={activeMember.name} />

			<label for="email">Email</label>
			<input type="text" name="email" bind:value={activeMember.email} />

			<label for="phone">Name</label>
			<input type="tel" name="phone" bind:value={activeMember.phone} />

			<label for="postalCode">Postal Code</label>
			<input type="text" name="postalCode" bind:value={activeMember.postalCode} />

			<label for="notes">Notes</label>
			<input type="text" name="notes" bind:value={activeMember.notes} />
		</form>
	</div>
{:else}
	<div>Please select a Member</div>
{/if}

<style>
	.form-container {
		display: flex;
		justify-content: center;
		min-width: 50%;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	input {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}
</style>
