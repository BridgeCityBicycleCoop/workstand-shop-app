<script lang="ts">
	import type { Member } from '$lib/models/member';

	export let member: Member | null = null;

	function handleClose(event: HTMLElementEventMap['click']) {
		console.log('close ev', event);
		member = null;
	}
</script>

{#if member}<div>Edit {member.name}'s Info</div>
	<br />
	<div class="form-container">
		<form method="dialog">
			<label for="name">Name</label>
			<input type="text" name="name" bind:value={member.name} />

			<label for="email">Email</label>
			<input type="text" name="email" bind:value={member.email} />

			<label for="phone">Name</label>
			<input type="tel" name="phone" bind:value={member.phone} />

			<label for="postalCode">Postal Code</label>
			<input type="text" name="postalCode" bind:value={member.postalCode} />

			<label for="notes">Notes</label>
			<input type="text" name="notes" bind:value={member.notes} />
			<span class="button-container">
				<button on:click={handleClose}>Cancel</button>
				<button on:click={handleClose}>Save and Close</button>
			</span>
		</form>
	</div>
{:else}
	<div>Please select a Member to edit</div>
{/if}

<style>
	.form-container {
		display: flex;
		justify-content: center;
		min-width: 50%;
	}

	button {
		min-height: 40px;
		margin: 20px;
	}

	.button-container {
		display: flex;
		justify-content: space-around;
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
