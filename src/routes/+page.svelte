<script lang="ts">
	import Select from '../components/Select.svelte';
	import DiBfs from '../dibfs';
	import SymbolGraph from '../symboldigraph';
	import type { PageData } from './$types';
	export let data: PageData;

	const logins = data.users.map((u) => u.login);
	const NOT_SELECTED = '(não selecionado)';
	const sg = new SymbolGraph(logins, data.connections);

	const g = sg.graph();
	let userOrigin = '';
	let userDestination = '';

	let userOriginId = -1;
	let userDestinationId = -1;

	let pathToDestination: number[] = [];
	let pathToDestinationLogins: string[] = [];

	function runBfs() {
		if (userOrigin === '' || userDestination === '') return;

		pathToDestinationLogins = [];
		const bfs = new DiBfs(g, userOriginId);
		pathToDestination = bfs.pathTo(userDestinationId);
		for (const id of pathToDestination) {
			pathToDestinationLogins.push(sg.name(id));
		}
	}
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<main>
	<h1>Rede (de Alguns) Usuários do GitHub</h1>

	<div class="inputs">
		<div>
			<p>Usuário de <strong>origem</strong> selecionado:</p>
			<p>{userOrigin.length > 0 ? userOrigin : NOT_SELECTED}</p>
			<p>{userOriginId === -1 ? NOT_SELECTED : 'ID: ' + userOriginId}</p>
			<Select
				values={logins}
				bind:value={userOrigin}
				on:change={() => {
					userOriginId = sg.id(userOrigin);
					runBfs();
				}}
			/>
		</div>
		<div>
			<p>Usuário de <strong>destino</strong> selecionado:</p>
			<p>{userDestination.length > 0 ? userDestination : NOT_SELECTED}</p>
			<p>{userDestinationId === -1 ? NOT_SELECTED : 'ID: ' + userDestinationId}</p>
			<Select
				values={logins}
				bind:value={userDestination}
				on:change={() => {
					userDestinationId = sg.id(userDestination);
					runBfs();
				}}
			/>
		</div>
	</div>

	<div class="graph-path">
		{#if pathToDestination.length === 0}
			<pre>Não há caminho</pre>
		{:else}
			<pre>{pathToDestination}</pre>
			<pre>{pathToDestinationLogins}</pre>
		{/if}
	</div>

	<p>Rodar BFS de origem -> destino</p>

	<small
		>Faz sentido diferenciar origem e destino? Não seria legal mostrar tanto a ida como a volta?</small
	>
</main>

<style>
	.inputs {
		display: flex;
		justify-content: center;
	}

	.graph-path {
		margin: 0 auto;
		text-align: center;
	}

	div > div {
		padding: 1em;
	}
</style>
