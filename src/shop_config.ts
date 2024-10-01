export const shopConfig: Record<string, string> = {
	// locale & timeZone- used for dates, language and currency preferences
	// 'en-CA', 	'Canada/Saskatchewan', 'Canada/Central', 'Canada/Mountain'
	locale: 'en-US',
	timeZone: 'America/Detroit',

	// logo url - set to update the left upper corner logo
	// recommended ratio is roughly 5 (wide) x 2 (high) resolution
	// rename your logo to shopLogo.png and add to /static folder
	// items in the static folder don't require /static in the path
	// or use a fully qualified path to an external logo
	// ex: logoUrl = 'https://some/hosted/image.png'
	logoUrl: '/shopLogo.png',

	// title - set this to your shop name
	// ex: const shopName = 'Bridge City Bicyle Co-Op'
	shopName: 'Bridge City Bicycle Co-Op',
	// Font - set this to your brand's font
	// ex: const shopNameFont = 'Arial'
	shopNameFont: 'Fira Mono'
};

export const theme: Record<string, string> = {
	/* font and text */
	'font-body': `Arial, -apple-system, BlinkMacSystemFont, 'Open Sans', sans-serif`,
	'font-mono': `'Fira Mono', monospace`,
	'font-size': `16px`,
	'color-text': `#323336`,
	'color-text-light': `#dde9f8`,
	/* main colors */
	/* removal of rgb() wrapper allows adding opactiy in the app */
	'color-primary': `64, 117, 166 ` /* #4075a6 */,
	'color-secondary': `64, 117, 166` /* #40A6A4 */,
	'color-neutral': `250, 250, 250`,
	'color-success': 'rgb(15 186 129)',
	'color-warning': 'rgb(167 127 6)',
	'color-error': 'rgb(220 20 60)',
	/* accent */
	'color-accent': `#a348e9`,
	'color-accent-subtle': `#e9ecef`,
	'color-accent-med': `rgb(132, 165, 197)`
};
