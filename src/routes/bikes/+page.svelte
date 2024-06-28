<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form);
</script>

<div class="bike-page">
	<div>
		<h1>Register New Bike</h1>
		<div class="serial-search">
			<a href="https://www.cpic-cipc.ca/sbi-rve-eng.htm" target="_blank"
				>Search Bike Serial Number</a
			>
		</div>
	</div>

	<div class="form-container">
		<form id="register-bike" method="POST" use:enhance>
			<label for="serialNumber">Serial #</label>
			<input type="text" name="serialNumber" bind:value={$form.serialNumber} />

			<label for="brand">Brand</label>
			<input type="text" name="brand" bind:value={$form.brand} />

			<label for="model">Model</label>
			<input type="text" name="model" bind:value={$form.model} />

			<label for="style">Style</label>
			<input type="text" name="style" bind:value={$form.style} />

			<label for="color">Color</label>
			<input type="text" name="color" bind:value={$form.color} />

			<label for="price">Price</label>
			<input type="number" step="0.01" name="price" bind:value={$form.price} />

			<label for="notes">Notes</label>
			<textarea rows="4" name="notes" bind:value={$form.notes}></textarea>

			<input type="hidden" name="status" value="active" />
		</form>
	</div>

	<br />
	{#if $message}
		<div class="message-container">
			{#if typeof $message === 'string'}
				<div class="message">{$message}</div>
			{:else}
				{#each Object.entries($message) as [key, val]}
					<div class="message">ERROR: {val}</div>
				{/each}
			{/if}
		</div>
	{/if}

	<br />
	<div class="register-bike-buttons">
		<button type="reset" form="register-bike">Cancel Registration</button>
		<button type="submit" form="register-bike">Click to Register New Bike</button>
	</div>
</div>

<style>
	.bike-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
	}

	.serial-search {
		display: flex;
		justify-content: center;
		margin: 20px 0px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	form {
		display: grid;
		grid-template-columns: max-content max-content;
		grid-gap: 5px;
	}

	.message-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.message {
		font-weight: bold;
		color: rebeccapurple;
	}

	form label {
		text-align: left;
	}

	form label:after {
		content: ':';
	}

	input {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	textarea {
		padding: 12px 20px;
		margin: 4px 0px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	button {
		min-height: 40px;
		margin: 25px 10px;
		padding: 10px 30px;
	}
</style>
