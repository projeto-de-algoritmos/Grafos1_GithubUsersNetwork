<script lang="ts">
	export let value: string = '';
	export let values: string[] = [];
	export let filteredValues: string[] = [];

	let filter = '';

	const filterLogins = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
		console.log('filtering...');

		filteredValues = [];
		for (let i = 0; i < values.length; i++) {
			if (values[i].indexOf(e.currentTarget.value) >= 0) {
				filteredValues.push(values[i]);
			}
		}

		console.log('filtering... done');
	};
</script>

<div>
	<input type="text" on:keyup={filterLogins} bind:value={filter} />

	<select bind:value>
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
</style>
