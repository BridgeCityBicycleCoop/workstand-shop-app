<script lang="ts">
	import { format } from 'date-fns';
	import Disclosure from './Disclosure.svelte';

	export let name: string = '';
	export let requiresGuardian: boolean = false;
	export let guardianName: string | null = '';

	let waiverDate = format(Date.now(), 'LLLL dd, yyyy');
</script>

<div class="wavier-container">
	<h2 class="wavier-title">Member Liability Waiver</h2>
	<small>
		***Children under the age of 18 must have a parent or guardian co-sign the following waiver
		form.
	</small>
	<small>
		***Children under the age of 13 must have guardian supervision when participating in BCBC
		activities and events.
	</small>
	<Disclosure>
		<span slot="title">Show Waiver</span>
		<span slot="open-title">Hide Waiver</span>
		<p>
			The Bridge City Bicycle Co-operative (herein referred to as The BCBC and The Community) is a
			nonprofit, community bicycle repair education and resource co-operative. We offer our members
			nonjudgmental repair space, tools and instruction during business hours (hours on website) by
			donation, and educational workshops. We also offer reconditioned/recycled low cost bikes and
			parts for sale. The BCBC is operated by volunteers; a medley of professionals, students, bike
			enthusiasts, activists, and other community members who share a love for cycling in Saskatoon.
			Membership is open to all individuals and is free for anyone to get. Contact Info Used to
			inform you of upcoming events – Please print clearly
		</p>
		<p>
			By signing this form in the space provided below, I hereby assume all of the risks of
			participating and/or volunteering in the Bridge City Bicycle Co-operative, hereinafter
			referred to as the BCBC and the Community. I realize that liability may arise from negligence
			or carelessness on the part of the persons or entities being released, from dangerous or
			defective equipment or property owned, maintained or controlled by them or because of their
			possible liability without fault. I acknowledge that this Accident Waiver and Release of
			Liability form will be used by the Community, sponsors and organizers, in which I may
			participate and that it will govern my actions and responsibilities during my use of its
			services. In consideration of my application and permitting me to participate in this program,
			I hereby take action for myself, my executors, administrators, heirs, next of kin, successors,
			and assigns as follows: (A) Waive, Release and Discharge from any and all liability for my
			death, disability, personal injury, property damage, property theft or actions of any kind
			which may hereafter accrue to me including my traveling to and from space or using the shop's
			bicycle, equipment or other facilities, THE FOLLOWING ENTITIES OR PERSONS: The directors,
			officers, employees, volunteers, representatives, and agents, the event holders, sponsors,
			volunteers of the Community; (B) Indemnify and Hold Harmless the entities and persons set
			forth in (A) above from any and all liabilities and claims arising from my participation in
			the Community, including my use of a bicycle belonging to the Community, irrespective of
			whether the cause of the claims or liability arise from the negligence, acts or omissions of
			me, a third party, or the Community.
		</p>
	</Disclosure>
	<div class="wavier-signature">
		<p>I {name} have read and agree to the above terms & conditions.</p>
		<p>Date: {waiverDate}</p>
		{#if requiresGuardian}
			<p>Guardian Name (if under 18): {guardianName ?? ''}</p>
			<p>Guardian Signature: <span class="signature">{guardianName ?? ''}</span></p>
		{:else}
			<p>Signature: <span class="signature">{name}</span></p>
		{/if}
	</div>
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
</style>
