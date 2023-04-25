<script lang="ts">
	import Select from '../components/Select.svelte';
	import SymbolGraph from '../symboldigraph';
	import type { PageData } from './$types';
	export let data: PageData;

	const logins = data.users.map((u) => u.login);
	const sg = new SymbolGraph(logins, data.connections);

	const g = sg.graph();

	let userOrigin = '';
	let userDestination = '';
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<main>
	<h1>Rede (de Alguns) Usuários do GitHub</h1>

	<div class="inputs">
		<div>
			<p>Usuário de origem selecionado: {userOrigin}</p>
			<Select values={logins} bind:value={userOrigin} />
		</div>
		<div>
			<p>Usuário de destino selecionado: {userDestination}</p>
			<Select values={logins} bind:value={userDestination} />
		</div>
	</div>
</main>

<!-- <div style="display: grid; grid-template-columns: 1fr 4fr;">
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
 -->
<style>
	div > div {
		padding: 1em;
		/* border: 1px solid #fff; */
	}
</style>
