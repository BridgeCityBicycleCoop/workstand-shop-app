<script lang="ts">
	import { goto } from '$app/navigation';
	import { ActivitySelect, Modal, getLocaleDisplayDateAndTime, getDisplayName } from '$lib/ui';
	import ClipboardEditOutline from '~icons/mdi/clipboard-edit-outline';
	import QuestionMark from '~icons/mdi/question-mark';
	import Exclamation from '~icons/mdi/exclamation-thick';
	import AlertOctagon from '~icons/mdi/alert-octagon-outline';
	import { shopConfig } from '../../shop_config.js';
	import type { FormEventHandler } from 'svelte/elements';
	import type { Member, Purpose, Visit } from '$lib/models';

	export let data;

	const title = shopConfig.shopName ? `Home - ${shopConfig.shopName}` : `Home`;
	let selectedPurpose: Purpose;
	let activeMember: Member | undefined;
	let activeVisit: Visit | undefined;

	let isOpen: boolean;

	let showList: boolean;
	let filteredMemeberList: Member[];
	let searchElement: HTMLInputElement;

	$: signedInMembers = new Set(data.visits.visitsList.map((visit) => visit.member.id));

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		const filterText = event.currentTarget?.value.toLocaleLowerCase();

		filteredMemeberList = data.members.filter((member) => {
			const memberName = member.name.toLocaleLowerCase();
			const perferredName = member.preferredName?.toLocaleLowerCase();

			return memberName.match(filterText) || perferredName?.match(filterText);
		});

		showList = filterText.length > 1 && filteredMemeberList.length > 0;
	};

	const handleMemberSelect = (_event: MouseEvent, member: Member) => {
		activeMember = member;
		isOpen = true;
	};

	const handleVisitUpdate = (_event: MouseEvent, visit: Visit) => {
		activeMember = visit.member;
		activeVisit = visit;
		isOpen = true;
	};

	const handleEditMember = (_event: MouseEvent, member: Member) => {
		goto(`/members/${member.id}`);
	};

	const handleClose = () => {
		isOpen = false;
		activeMember = undefined;
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Workstand - A shop application for Bicycle Co-ops" />
</svelte:head>

<div class="signin">
	<div class="members-search">
		<label for="filter">Members Search:</label>
		<input
			on:input={handleInput}
			name="filter"
			type="search"
			bind:this={searchElement}
			autocomplete="off"
		/>
	</div>

	<div class="search-results">
		{#if showList}
			{#each filteredMemeberList as member}
				<div class="button-group">
					<button
						class="primary activity"
						on:click={(event) => handleMemberSelect(event, member)}
						disabled={signedInMembers.has(member.id)}
					>
						{#if member.status === 'suspended'}
							<i class="icon warning"><Exclamation /></i>
						{:else if member.status === 'banned'}
							<i class="icon error"><AlertOctagon /></i>
						{:else if member.notes}
							<i class="icon"><QuestionMark /></i>
						{/if}
						{getDisplayName(member)}
					</button>

					<button
						class="primary edit"
						class:unavailable={signedInMembers.has(member.id)}
						on:click={(event) => handleEditMember(event, member)}
					>
						<ClipboardEditOutline />
						<span class="visually-hidden">Edit Member</span>
					</button>
				</div>
			{/each}
		{/if}
	</div>

	<section class="currently-signed-in">
		<h3>Signed in today</h3>
		<div class="tableWrap">
			{#if data.visits.visitsList.length > 0}
				<table>
					<thead>
						<tr>
							<th class="sticky-header">Name</th>
							<th class="sticky-header">Purpose</th>
							<th class="sticky-header">Signed-in At</th>
						</tr>
					</thead>
					<tbody>
						{#each data.visits.visitsList as visit}
							<tr>
								<td>
									<button
										class="edit-profile link"
										on:click={(event) => handleVisitUpdate(event, visit)}
										>{getDisplayName(visit.member)}
									</button>
								</td>
								<td>{visit.purpose.name}</td>
								<td>{getLocaleDisplayDateAndTime(visit.date).display}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<p>No members signed in</p>
			{/if}
		</div>
	</section>
</div>

<Modal bind:open={isOpen}>
	<ActivitySelect
		formId="log-visit"
		formData={data.logVisitForm}
		bind:selectedPurpose
		purposes={data.purposes}
		displayName={getDisplayName(activeMember)}
		{activeMember}
		{activeVisit}
		onSuccess={() => {
			handleClose();
			searchElement.value = '';
			searchElement.dispatchEvent(new Event('input', { bubbles: true }));
		}}
	>
		<div class="member-notes">
			{#if activeMember?.status === 'suspended'}
				<div class="note warning">
					<Exclamation />
					<span>This member is currently suspended</span>
				</div>
			{:else if activeMember?.status === 'banned'}
				<div class="note error">
					<AlertOctagon />
					<span>This member is currently banned</span>
				</div>
			{/if}
			{#if activeMember?.notes}
				<div class="note">
					<QuestionMark />
					<div>{@html activeMember.notes}</div>
				</div>
			{/if}
		</div>
	</ActivitySelect>
	<div slot="buttons">
		<button class="primary" on:click={handleClose}>Cancel</button>
	</div>
</Modal>

<style>
	.signin {
		display: grid;
		grid-template-areas:
			'members-search'
			'search-results'
			'activity';
		grid-template-rows: auto minmax(35dvh, max-content) auto;
		row-gap: 1rem;
		min-height: 100%;
		max-width: 48rem;
		padding-top: 3rem;
		margin: 0 auto;
	}

	.members-search {
		grid-area: members-search;
	}
	.members-search label {
		display: block;
		margin: 30px 0px;
	}
	.members-search input {
		width: 100%;
	}

	.search-results {
		grid-area: search-results;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.currently-signed-in {
		grid-area: activity;
	}

	/* If we use border,
	we must use table-collapse to avoid
	a slight movement of the header row */
	table {
		border-collapse: collapse;
	}

	.button-group .icon {
		color: hsl(from rgb(var(--text-color-light)) h s l / 0.5);
	}

	.button-group .icon.warning {
		color: hsl(from var(--color-warning) h 110% 60% / 1);
	}

	.button-group .icon.error {
		color: hsl(from var(--color-error) h 110% 60% / 1);
	}

	.button-group .edit {
		flex: 0 1 content;
	}

	.member-notes {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;

		& > .note {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			padding: 1rem;
			background-color: hsl(from var(--color-bg-light) h s 70%);

			& > *:first-child {
				min-width: 1.2rem;
			}

			&.error {
				background-color: var(--color-error, rgb(220 20 60));
				color: var(--text-color-light, white);
			}

			&.warning {
				background-color: var(--color-warning, rgb(167 127 6));
				color: var(--text-color-light, white);
				padding: 1rem;
			}
		}
	}
</style>
