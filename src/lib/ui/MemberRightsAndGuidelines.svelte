<script lang="ts">
	import { format } from 'date-fns';

	export let name: string = '';
	export let requiresGuardian: boolean = false;
	export let guardianName: string | null = '';

	let waiverDate = format(Date.now(), 'LLLL dd, yyyy');

	const toggleCollapsibleContent = (ev: MouseEvent) => {
		const el = <HTMLElement>ev.target;
		el?.classList.toggle('active');
		const content = <HTMLElement>el.nextElementSibling;
		if (content) {
			if (content.style.maxHeight) {
				content.style.maxHeight = '';
			} else {
				content.style.maxHeight = content.scrollHeight + 'px';
			}
		}
	};
</script>

<h2>Bridge City Bicycle Co-op - Member Rights and Respect Guidelines</h2>
<small>
	The Bridge City Bicycle Co-osmallerative aims to be a safe and respectful environment geared
	towards education, empowerment and community-building. In order to do so we need your input and
	support.
</small>
<button class="collapsible" on:click={toggleCollapsibleContent}>Show Guidelines</button>
<div class="collapsible-content">
	<h3>Member Privileges</h3>
	<li>Access to the BCBC tools, stands and workspace</li>
	<li>Access to friendly mechanical assistance and education when available</li>
	<li>Opportunity to engage in decisions and help to build and develop the community's vision</li>

	<p>
		Member Responsibilities (If members fail to reasonably fulfill the following responsibilities,
		their privileges may revoked)
	</p>

	<h3>Respect and Maintaining a Safe Space</h3>
	<li>Respect others and self</li>
	<li>Help others</li>
	<li>
		Racist, ableist, ageist, homophobic, sexist and classist behavior and language will not be
		tolerated
	</li>
	<li>
		The BCBC seeks to build a healthy lifestyle community, and behavior seen as hindering this
		objective will not be tolerated.
	</li>
	<li>Ask for help: With tools, processes, and even emotions</li>

	<h3>Respect the Community</h3>
	<li>Build positive relationships with Community Members</li>
	<li>Build positive relationships with CNYC employees, volunteers, and patrons</li>

	<h3>Respect the Space</h3>
	<li>Replace tools when not using them so that others can play too.</li>
	<li>Do not steal or borrow articles within the space for personal use.</li>
	<li>If you don't know what it is or where it goes, ask someone</li>
	<li>
		Ensure you always leave time to clean up after yourself and others, and then clean up after
		yourself
	</li>
	<li>
		If you have to leave in the middle of a project, put pieces into a small bag and attach it to
		the bike, preferably with your name on the bag.
	</li>
	<li>
		Personal projects may be kept at the BCBC for a maximum of one day; however, this is highly
		discouraged due to lack of space and the concern for theft.
	</li>
	<li>Label your bike with your name, phone number, and the last date you worked on it.</li>
	<li>
		Do Not Force Tools, And Use Them Only For Their Intended Use. You break it, you buy it. If you
		need help or guidance, ask someone! It’s what we’re here for!
	</li>

	<h4>Giving Back:</h4>
	<p>
		Our services are free and Members are encouraged to contribute in any way they can. Our vibrancy
		comes from the volunteer work of a large community with diverse skills and passions. There are
		so many ways to be a part of this community, regardless of whether or not you know how to change
		a tire (yet!). Ask how you can help out!
	</p>
</div>
<div class="guidelines-signature">
	<p>
		I {name} (print full name) acknowledge that my Membership and privileges in the Bridge City Bicycle
		Co-operative is contingent upon fulfilling the above responsibilities.
	</p>
	<p>Date: {waiverDate}</p>
	{#if requiresGuardian}
		<p>Guardian Name (if under 18): {guardianName ?? ''}</p>
		<p>Guardian Signature: <span class="signature">{guardianName ?? ''}</span></p>
	{:else}
		<p>Signature: <span class="signature">{name}</span></p>
	{/if}
</div>

<style>
	small {
		display: block;
		margin-bottom: 1em;
	}
	.signature {
		font-style: italic;
		font-weight: bold;
	}

	.collapsible {
		background-color: #777;
		color: white;
		cursor: pointer;
		padding: 18px;
		width: 100%;
		border: none;
		text-align: left;
		outline: none;
		font-size: 15px;
	}

	.active,
	.collapsible:hover {
		background-color: #555;
	}

	.collapsible:after {
		content: '\002B';
		color: white;
		font-weight: bold;
		float: right;
		margin-left: 5px;
	}

	.active:after {
		content: '\2212';
	}

	.collapsible-content {
		padding: 0 18px;
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.2s ease-out;
		background-color: #f1f1f1;
	}
</style>
