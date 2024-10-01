declare namespace svelteHTML {
	interface IntrinsicElements {
		details: {
			open?: boolean | undefined | null;
			name?: string | undefined | null;

			'bind:open'?: boolean | undefined | null;

			'on:toggle'?: EventHandler<Event, HTMLDetailsElement> | undefined | null;
		};
	}
}
