<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const onChange = () => dispatch('change');
	export let value: string = '';
	export let values: string[] = [];
	let filteredValues: string[] = [];

	type WithTarget<Event, Target> = Event & { currentTarget: Target };

	let filter = '';

	const filterLogins = (e: WithTarget<KeyboardEvent, HTMLInputElement>) => {
		console.log('filtering...');

		filteredValues = [];
		for (let i = 0; i < values.length; i++) {
			if (values[i].toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) >= 0) {
				filteredValues.push(values[i]);
			}
		}

		console.log('filtering... done');
	};
</script>

<div>
	<input type="text" on:keyup={filterLogins} bind:value={filter} />

	<select bind:value on:change={onChange}>
		{#if filter.length === 0}
			{#each values as value}
				<option {value}>{value}</option>
			{/each}
		{:else}
			{#each filteredValues as value}
				<option {value}>{value}</option>
			{/each}
		{/if}
	</select>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}

	div > input {
		margin-bottom: 8px;
	}
</style>
