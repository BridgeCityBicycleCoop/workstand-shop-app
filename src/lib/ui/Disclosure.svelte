<script lang="ts">
	export let open = false;
	export let name: string | undefined | null = undefined;
</script>

<details bind:open {name}>
	{#if $$slots.title && ((!$$slots['open-title'] && open) || (!$$slots['closed-title'] && !open))}
		<summary>
			<slot name="title"></slot>
		</summary>
	{/if}
	{#if $$slots['open-title'] && open}
		<summary>
			<slot name="open-title"></slot>
		</summary>
	{/if}
	{#if $$slots['closed-title'] && !open}
		<summary>
			<slot name="closed-title"></slot>
		</summary>
	{/if}
	<div class="content">
		<slot></slot>
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
