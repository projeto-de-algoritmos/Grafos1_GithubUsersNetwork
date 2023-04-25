<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<p>Quantidade de usuários: {data.users.length}</p>

<p>Quantidade de nós: {data.graph.length}</p>

<div style="display: grid; grid-template-columns: 1fr 4fr;">
	{#each data.graph as node}
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
