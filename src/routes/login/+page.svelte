<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	export let data: PageData;

	// export let form: ActionData;
</script>

{#if !data.user}
	<form method="post" use:enhance>
		<button type="submit"> Login with hardcoded password</button>
		<input type="hidden" name="email" value="test@example.com" />
		<input type="password" name="password" value="1234567890" />
	</form>
{:else}
	<form method="post" use:enhance>
		<button type="submit" value="logout"> Logout {data.user}</button>
	</form>
{/if}

<style>
	button {
		border: 1px solid var(--color-theme-1);
		padding: 4px;
		margin-top: 10px;
		background-color: var(--color-bg-0);
		color: var(--color-text);

		&:hover {
			background-color: var(--color-bg-1);
		}
	}
</style>
