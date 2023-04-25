<script lang="ts">
	import SymbolGraph from '../symboldigraph';
	import type { PageData } from './$types';
	export let data: PageData;

	const logins = data.users.map((u) => u.login);

	const sg = new SymbolGraph(logins, data.connections);
	let filter = '';

	let filteredLogins: string[] = [];

	const g = sg.graph();

	const filterLogins = (e: Event & { currentTarget: EventTarget & HTMLSelectElement }) => {
		console.log('filtering...');

		filteredLogins = [];
		for (let i = 0; i < logins.length; i++) {
			if (logins[i].indexOf(e.currentTarget.value) >= 0) {
				filteredLogins.push(logins[i]);
			}
		}

		console.log(filteredLogins);

		console.log('filtering... done');
	};
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<select>
	{#if filter.length === 0}
		{#each logins as login}
			<option value={login}>{login}</option>
		{/each}
	{:else}
		{#each filteredLogins as login}
			<option value={login}>{login}</option>
		{/each}
	{/if}
</select>

<input type="text" on:keyup={filterLogins} bind:value={filter} />

<div style="display: grid; grid-template-columns: 1fr 4fr;">
	{#each data.connections as node}
		<div>
			<strong>
				<code>{node.login} </code>
			</strong>
		</div>

		<div>
			<code>{'<-'}</code>
			{#each node.followers as f}
				{f}{', '}
			{/each}
		</div>
	{/each}
</div>

<style>
	div > div {
		padding: 1em;
		/* border: 1px solid #fff; */
	}
</style>
