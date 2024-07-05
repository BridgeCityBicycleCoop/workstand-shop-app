<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import LiabilityWaiver from '$lib/ui/LiabilityWaiver.svelte';
	import MemberEditFields from '$lib/ui/forms/MemberEditFields.svelte';

	export let data;

	const { form, errors, enhance, message } = superForm(data.form);
</script>

<section class="register-member">
	<div>
		<h1>Register New Member</h1>
	</div>

	<div class="form-container">
		<form id="register-member" method="POST" use:enhance>
			<MemberEditFields memberForm={form} {errors} />
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
	<LiabilityWaiver
		name={$form.name}
		requiresGuardian={$form.requiresGuardian}
		guardianName={$form.guardianName}
	></LiabilityWaiver>
	<div class="register-member-buttons">
		<button class="btn btn-primary" on:click={() => goto('/')}>Cancel Registration</button>
		<button class="btn btn-primary" type="submit" form="register-member"
			>Click to Agree to Waiver</button
		>
	</div>
</section>

<style>
	.register-member {
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

	button {
		min-height: 40px;
		margin: 25px 10px;
		padding: 10px 30px;
	}
</style>
