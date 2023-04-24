<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>Quantidade de usuários: {data.users.length}</p>

<ol>
	{#each data.users as user, i}
		<li><code>{user.login}</code></li>
	{/each}
</ol>
