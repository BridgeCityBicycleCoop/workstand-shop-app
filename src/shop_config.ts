export const shopConfig: Record<string, string> = {
	// locale - used for dates, language and currency preferences
	locale: 'en-US',

	// logo url - set to update the left upper corner logo
	// recommended ratio is roughly 5 (wide) x 2 (high) resolution
	// rename your logo to shopLogo.png and add to /src/lib/images/
	// or use a fully qualified path to an external logo
	// ex: logoUrl = 'https://some/hosted/image.png'
	logoUrl: '$lib/images/shopLogo.png',

	// title - set this to your shop name
	// ex: const shopName = 'Bridge City Bicyle Co-Op'
	shopName: '',
	// Font - set this to your brand's font
	// ex: const shopNameFont = 'Arial'
	shopNameFont: ''
};

export const theme: Record<string, string> = {
	/* font and text */
	'--font-body': `Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`,
	'--font-mono': `'Fira Mono', monospace;`,
	'--font-size': `16px;`,
	'--color-text': `#323336;`,
	'--color-text-light': `#dde9f8;`,
	/* main colors */
	/* removal of rgb() wrapper allows adding opactiy in the app */
	'--color-primary': `64, 117, 166; ` /* #4075a6; */,
	'--color-secondary': `64, 117, 166;` /* #40A6A4; */,
	'--color-neutral': `250, 250, 250;`,
	/* accent */
	'--color-accent': `#a348e9;`,
	'--color-accent-subtle': `#e9ecef;`,
	'--color-accent-med': `rgb(132, 165, 197);`
};
