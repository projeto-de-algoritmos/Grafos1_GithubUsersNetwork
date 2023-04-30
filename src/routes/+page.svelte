<script lang="ts">
	import { onMount } from 'svelte';
	import Select from '../components/Select.svelte';
	import DiBfs from '../dibfs';
	import SymbolGraph from '../symboldigraph';
	import type { PageData } from './$types';
	import { setCoordsRandomly } from '../coords';
	import { setDrawables, startRendering } from './renderer';
	export let data: PageData;

	let canvas: HTMLCanvasElement;
	let canvasWidth = 400;
	let canvasHeight = 400;

	const logins = data.users.map((u) => u.login);
	const NOT_SELECTED = '(não selecionado)';
	const sg = new SymbolGraph(logins, data.connections);

	const g = sg.graph();

	let userOrigin = '';
	let userDestination = '';

	let userOriginId = -1;
	let userDestinationId = -1;

	let pathToDestinationIds: number[] = [];
	let pathToDestinationLogins: string[] = [];
	let frame: number;

	function runBfs() {
		if (userOrigin === '' || userDestination === '') return;

		pathToDestinationLogins = [];
		const bfs = new DiBfs(g, userOriginId);
		pathToDestinationIds = bfs.pathTo(userDestinationId);
		for (const id of pathToDestinationIds) {
			pathToDestinationLogins.push(sg.name(id));
		}
	}

	onMount(() => {
		canvas = document.querySelector('canvas')!;
		const canvasContainer = document.querySelector<HTMLDivElement>('#canvas-container')!;

		canvas.height = canvasContainer.clientHeight;
		canvas.width = canvasContainer.clientWidth;
		setCoordsRandomly({
			g,
			xMax: canvas.width - 30,
			yMax: canvas.height - 30,
			xOffset: 15,
			yOffset: 15,
		});

		setDrawables(g, canvas);
		startRendering();
	});
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<main>
	<h1>Rede (de alguns) Usuários do GitHub</h1>

	<div class="inputs">
		<div>
			<Select
				values={logins}
				bind:value={userOrigin}
				on:change={() => {
					userOriginId = sg.id(userOrigin);
					runBfs();
				}}
			/>
			<p>Usuário de <strong>origem</strong> selecionado:</p>
			<p>{userOrigin.length > 0 ? userOrigin : NOT_SELECTED}</p>
			<p>{userOriginId === -1 ? NOT_SELECTED : 'ID: ' + userOriginId}</p>
		</div>

		<div>
			<Select
				values={logins}
				bind:value={userDestination}
				on:change={() => {
					userDestinationId = sg.id(userDestination);
					runBfs();
				}}
			/>
			<p>Usuário de <strong>destino</strong> selecionado:</p>
			<p>{userDestination.length > 0 ? userDestination : NOT_SELECTED}</p>
			<p>{userDestinationId === -1 ? NOT_SELECTED : 'ID: ' + userDestinationId}</p>
		</div>
	</div>

	<div class="graph-path">
		{#if pathToDestinationIds.length === 0}
			<pre>Não há caminho</pre>
		{:else}
			<pre>{pathToDestinationIds}</pre>
			<pre>{pathToDestinationLogins}</pre>
		{/if}
	</div>

	<div id="canvas-container">
		<canvas width={canvasWidth} height={canvasHeight} />
	</div>

	<p>Rodar BFS de origem -> destino</p>

	<small>
		Faz sentido diferenciar origem e destino? Não seria legal mostrar tanto a ida como a volta?
	</small>
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

	#canvas-container {
		width: 100%;
	}

	div > div {
		padding: 1em;
	}
</style>
