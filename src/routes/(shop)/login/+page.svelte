<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import { Message } from '$lib/ui';

	export let data;
	const loginForm = superForm(data.loginForm);
	const { form, enhance, message } = loginForm;

	const registerForm = superForm(data.registerForm);
	const {
		form: registerFormData,
		enhance: registerEnhance,
		message: registerMessage
	} = registerForm;

	let registering = false;
	$: headingText = registering ? 'BCBC Workstand Registration' : 'BCBC Workstand Login';
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

		{#if !registering}
			<div>Please enter your username and password to log in to Workstand</div>
			<br />

			<form method="post" action="?/login" use:enhance>
				<Field form={loginForm} name="email">
					<Control let:attrs>
						<Label>Email</Label>
						<input {...attrs} type="email" bind:value={$form.email} />
					</Control>
					<FieldErrors />
				</Field>
				<Field form={loginForm} name="password">
					<Control let:attrs>
						<Label>Password</Label>
						<input {...attrs} type="password" bind:value={$form.password} />
					</Control>
					<FieldErrors />
				</Field>
				<Message message={$message} />
				<button class="btn btn-primary">Log In</button>
			</form>
		{:else}
			<div>
				<div>Please register for Workstand with and email and password</div>
				<div>(password must contain 8 letters, a number, and a special symbol)</div>
				<form method="POST" action="?/register" use:registerEnhance>
					<Field form={registerForm} name="email">
						<Control let:attrs>
							<Label>Email</Label>
							<input {...attrs} type="email" bind:value={$registerFormData.email} />
						</Control>
						<Description>You will be emailed a confirmation email to this address</Description>
						<FieldErrors />
					</Field>
					<Field form={registerForm} name="password">
						<Control let:attrs>
							<Label>Password</Label>
							<input {...attrs} type="password" bind:value={$registerFormData.password} />
						</Control>
						<Description
							>password must contain 8 letters, a number, and a special symbol</Description
						>
						<FieldErrors />
					</Field>
					<Field form={registerForm} name="confirmPassword">
						<Control let:attrs>
							<Label>Confirm Password</Label>
							<input
								{...attrs}
								type="confirmPassword"
								bind:value={$registerFormData.confirmPassword}
							/>
						</Control>
						<Description
							>password must contain 8 letters, a number, and a special symbol</Description
						>
						<FieldErrors />
					</Field>

					{#if $registerMessage}<h3>{$registerMessage}</h3>{/if}
					<button class="btn btn-primary">Register</button>
				</form>
			</div>
		{/if}
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

	[data-fs-error] {
		border: 3px solid red;
	}
</style>
