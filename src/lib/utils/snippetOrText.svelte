<script lang="ts" module>
	import type { Snippet } from 'svelte';
	export type SnippetOrText = string | Snippet;
	export type { Snippet };
	export { snippetOrText };
</script>

{#snippet snippetOrText(context?: SnippetOrText)}
	{#if typeof context === 'string'}
		{context}
	{:else}
		{@render context?.()}
	{/if}
{/snippet}
