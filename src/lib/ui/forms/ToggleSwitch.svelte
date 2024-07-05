<script lang="ts">
	export let checked = false;
</script>

<label>
	<input {...$$props} type="checkbox" bind:checked />
</label>

<style>
	input {
		opacity: 0;
		pointer-events: none;
		position: absolute;
		z-index: -1;
	}
	label {
		position: relative;
		display: inline-block;
		height: 1.5em;
		width: 3em;
		border-radius: 0.8em;
		cursor: pointer;

		background-color: var(--color-accent-subtle, #ccc);
		transition: background-color 0.2s;
	}

	label:has(:checked) {
		background-color: var(--color-accent, #66bb6a);
	}

	label::after {
		content: '';
		position: absolute;
		display: inline-block;
		bottom: 0.2em;
		left: 0.2em;
		width: 1.2em;
		height: 1.1em;
		border-radius: 50%;
		background-color: #fff;
		vertical-align: middle;

		transition: transform 0.2s;
	}
	label:has(:checked)::after {
		transform: translateX(1.4em);
	}
	label:has(input:focus-visible) {
		outline: var(--color-accent) solid 1px;
		outline: -webkit-focus-ring-color solid 1px;
	}
</style>
