<script lang="ts">
	import { enhance } from '$app/forms';
	// export let form: ActionData;

	let registered = true;
	$: headingText = registered ? 'BCBC Workstand Login' : 'BCBC Workstand Registration';

	const toggleRegistered = () => {
		registered = !registered;
	};
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>{headingText}</h1>

	{#if registered}
		<div class="text-column">Please enter your username and password to log in to Workstand</div>

		<form method="post" action="?/login" use:enhance>
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button>Log In</button>
		</form>
	{:else}
		<div class="text-column">
			<div class="text-column">Please register for Workstand with and email and password</div>
			<div class="text-column">
				(password must contain 8 letters, a number, and a special symbol)
			</div>
			<form method="POST" action="?/register">
				<label>
					Email
					<input name="email" type="email" />
				</label>
				<label>
					Password
					<input name="password" type="password" />
				</label>
				<button>Register</button>
			</form>
		</div>
	{/if}

	<button on:click={toggleRegistered}>Toggle Registered Status</button>
</div>

<style>
	form {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex: 1;
	}
</style>
