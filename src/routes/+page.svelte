<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<pre> {data.users.length} </pre>
<pre>{JSON.stringify(data.users, null, 2)}</pre>

<p>{data.dirContent}</p>
