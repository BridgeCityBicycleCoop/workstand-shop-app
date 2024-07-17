<script lang="ts">
	export let message;
</script>

{#if message}
	<div class="message-container">
		{#if typeof message === 'string'}
			<div class="message">{message}</div>
		{:else}
			{#each Object.entries(message) as [_key, val]}
				<div class="message">ERROR: {val}</div>
			{/each}
		{/if}
	</div>
{/if}

<style>
	.message-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.message {
		font-weight: bold;
		color: var(--color-accent);
	}
</style>
