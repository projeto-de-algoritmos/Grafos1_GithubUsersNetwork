<script lang="ts">
	import SymbolGraph from '../symboldigraph';
	import type { PageData } from './$types';
	export let data: PageData;

	const logins = data.users.map((u) => u.login);
	const sg = new SymbolGraph(logins, data.connections);

	const g = sg.graph();
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<pre>{g.toString()}</pre>

<p>Quantidade de usuários: {data.users.length}</p>

<p>Quantidade de nós: {data.connections.length}</p>

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
