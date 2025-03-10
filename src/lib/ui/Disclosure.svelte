<script lang="ts">
	import { snippetOrText, type SnippetOrText, type Snippet } from '$lib/utils';
	type Props = {
		open?: boolean;
		name?: string | null;
		title?: SnippetOrText;
		openTitle?: SnippetOrText;
		closedTitle?: SnippetOrText;
		children?: Snippet;
	};
	let { name, open = false, title, openTitle, closedTitle, children }: Props = $props();

	let titleForRender = $derived(
		open ? (openTitle ? openTitle : title) : closedTitle ? closedTitle : title
	);
</script>

<details bind:open {name}>
	<summary>
		{@render snippetOrText?.(titleForRender)}
	</summary>
	<div class="content">
		{@render children?.()}
	</div>
</details>

<style>
	summary {
		list-style: none;
		background-color: #777;
		color: white;
		cursor: pointer;
		padding: 18px;
		border: none;
		text-align: center;
		outline: none;
		font-size: 15px;
	}

	details[open] summary {
		background-color: #555;
	}

	@media (hover) {
		summary:hover {
			background-color: #555;
		}
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::after {
		content: ' +';
	}

	details[open] summary::after {
		content: ' -';
	}

	summary:focus-visible {
		outline: var(--color-accent) auto 1px;
		outline: -webkit-focus-ring-color auto 1px;
	}

	details > .content {
		display: block;
		padding: 5px 18px;
		background-color: #f1f1f1;
	}

	details::details-content {
		display: block;
		overflow: hidden;
		block-size: calc-size(any, 0px);
		transition-property: block-size, content-visibility;
		transition-duration: 0.5s;
		transition-behavior: allow-discrete;
	}

	details[open] > .content,
	details[open]::details-content {
		block-size: auto;
	}
</style>
