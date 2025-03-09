<script lang="ts">
	import { getContext } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { Message } from '$lib/ui';
	import type { Writable } from 'svelte/store';

	export let data;
	const loginForm = superForm(data.loginForm);
	const { form, enhance, message, delayed } = loginForm;

	const loading = getContext<Writable<boolean>>('loading-store');
	$: $loading = $delayed;

	$: headingText = 'BCBC Workstand Login';
</script>

<svelte:head>
	<title>Workstand - Login</title>
	<meta name="description" content="A shop application for Bicycle Co-ops" />
</svelte:head>

<div class="login-container">
	{#if data.user}
		<p class="logged-in">Logged in as {data.user.email}</p>
		<form method="post" action="?/logout" use:enhance>
			<button class="btn btn-primary">Log Out</button>
		</form>
	{:else}
		<h1>{headingText}</h1>

		<div>Please enter your username and password to log in to Workstand</div>

		<form method="post" action="?/login" use:enhance>
			<label for="email">Email</label>
			<input id="email" name="email" type="email" bind:value={$form.email} />

			<label for="password">Password</label>
			<input id="password" name="password" type="password" bind:value={$form.password} />

			<Message message={$message} />
			<button class="btn btn-primary">Log In</button>
		</form>
	{/if}
</div>

<style>
	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		gap: 1rem;
		flex: 1;
	}

	.logged-in {
		display: flex;
		justify-content: center;
		margin: 80px 0px;
	}
</style>
