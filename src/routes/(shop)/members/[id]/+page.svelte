<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { MemberEditFields, getDisplayName } from '$lib/ui';

	export let data;
	$: member = data.member;

	const { form, errors, enhance, message } = superForm(data.form, { resetForm: false });
</script>

<section>
	<div>
		<h1>{getDisplayName(member)}</h1>
	</div>

	<form id="update-member" method="POST" use:enhance>
		<MemberEditFields memberForm={form} {errors} />
	</form>

	{#if $message}
		<div class="message-container">
			{#if typeof $message === 'string'}
				<div class="message">{$message}</div>
			{:else}
				{#each Object.entries($message) as [key, val]}
					<div class="message">ERROR: [{key}] {val}</div>
				{/each}
			{/if}
		</div>
	{/if}

	<div class="buttons">
		<button class="btn btn-neutral" on:click={() => history.back()}>Back</button>
		<button class="btn btn-primary" type="submit" form="update-member">Update</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 50%;
		max-width: 80%;
		margin: auto;
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

	.buttons {
		display: flex;
		justify-content: space-between;
	}

	button {
		min-height: 40px;
		margin: 25px 10px;
		padding: 10px 30px;
	}
</style>
