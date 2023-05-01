<script lang="ts">
	import './style.css';

	import { onMount } from 'svelte';
	import Select from '../components/Select.svelte';
	import DiBfs from '../dibfs';
	import SymbolGraph from '../symboldigraph';
	import type { PageData } from './$types';
	import { setCoordsRandomly } from '../coords';
	import { setDrawables, startRendering, stopRendering } from './renderer';
	export let data: PageData;

	let canvas: HTMLCanvasElement;
	let canvasWidth = 400;
	let canvasHeight = 400;
	let bfs: DiBfs | null = null;

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

	function runBfs() {
		if (userOrigin === '' || userDestination === '') return;

		bfs = new DiBfs(g, userOriginId);
		pathToDestinationLogins = [];
		pathToDestinationIds = bfs.pathTo(userDestinationId);
		for (const id of pathToDestinationIds) {
			pathToDestinationLogins.push(sg.name(id));
		}

		setDrawables(g, canvas, pathToDestinationIds);
	}

	function reset() {
		console.log('Resetando valores');
		g.selected[userOriginId] = false;
		g.selected[userDestinationId] = false;
		userOrigin = '';
		userDestination = '';
		userOriginId = -1;
		userDestinationId = -1;
		pathToDestinationIds = [];
		pathToDestinationLogins = [];
		bfs = null;

		setDrawables(g, canvas, pathToDestinationIds);
	}

	onMount(() => {
		canvas = document.querySelector('canvas')!;
		const canvasContainer = document.querySelector<HTMLDivElement>('#canvas-container')!;

		canvas.width = canvasContainer.clientWidth * 0.88;
		canvas.height = canvasContainer.clientHeight;
		setCoordsRandomly({
			g,
			xMax: canvas.width - 30,
			yMax: canvas.height - 30,
			xOffset: 15,
			yOffset: 15,
		});

		setDrawables(g, canvas, pathToDestinationIds);
		startRendering();

		return () => stopRendering();
	});
</script>

<svelte:head>
	<title>Rede de Usuários GitHub</title>
</svelte:head>

<main>
	<div class="left">
		<h2>Rede (de alguns) Usuários do GitHub</h2>

		<div class="inputs">
			<div>
				<Select
					values={logins}
					bind:value={userOrigin}
					on:change={() => {
						g.selected[userOriginId] = false;
						userOriginId = sg.id(userOrigin);
						g.selected[userOriginId] = true;
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
						g.selected[userDestinationId] = false;
						userDestinationId = sg.id(userDestination);
						g.selected[userDestinationId] = true;
						runBfs();
					}}
				/>
				<p>Usuário de <strong>destino</strong> selecionado:</p>
				<p>{userDestination.length > 0 ? userDestination : NOT_SELECTED}</p>
				<p>{userDestinationId === -1 ? NOT_SELECTED : 'ID: ' + userDestinationId}</p>
			</div>
		</div>

		<button id="reset" on:click={reset}>Resetar</button>

		<div class="graph-path">
			{#if pathToDestinationIds.length === 0}
				<p>Não há caminho</p>
			{:else}
				<p>Caminhos de seguidores:</p>
				<ul>
					{#each pathToDestinationLogins as login}
						<li><code>{login}</code></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<div class="right">
		<div id="canvas-container">
			<canvas width={canvasWidth} height={canvasHeight} />
		</div>
	</div>
</main>

<style>
	main {
		margin: 0 16px;
		display: flex;
	}

	h2 {
		text-align: center;
	}

	.inputs {
		display: flex;
		justify-content: center;
	}

	.graph-path {
		margin: 0 auto;
		text-align: center;
	}

	.left {
		display: flex;
		flex-direction: column;
	}

	.right {
		width: 100%;
	}

	#canvas-container {
		margin: 0 auto;
		width: 100%;
	}

	canvas {
		border-radius: 8px;
	}

	#reset {
		margin-bottom: 16px;
	}

	div {
		padding: 0;
	}

	div > div {
		padding: 1em;
	}

	ul {
		text-align: left;
	}
	li {
		text-align: left;
		list-style: none;
	}
</style>
