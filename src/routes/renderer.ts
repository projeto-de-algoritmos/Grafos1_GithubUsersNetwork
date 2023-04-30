/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Vector } from '../defs';
import type Digraph from '../dipraph';
import type { Node } from '../dipraph';

const textSize = '8px';
const textColor = '#fff';
const accentColor = '#646cff';
const nodeBackgroundColor = '#242424';
const nodeRadius = 8;
const canvasBackgroundColor = '#2e2e2e';
const lineWidth = 1;
const lineColor = '#646cff20';

// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
const fps = 60,
	fpsInterval = 1000 / fps;
let lastFrameTime = 0,
	frameCount = 1,
	currentFrameTime = 0,
	startTime = 0;

let g: Digraph;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

export function setDrawables(graph: Digraph, _canvas: HTMLCanvasElement) {
	g = graph;
	canvas = _canvas;
}

export function startRendering() {
	currentFrameTime = window.performance.now();
	startTime = currentFrameTime;
	frameCount = 1;
	context = canvas.getContext('2d')!;
	Render();
}

function Render() {
	requestAnimationFrame(Render);

	currentFrameTime = window.performance.now();
	const elapsed = currentFrameTime - lastFrameTime;
	lastFrameTime = currentFrameTime;

	if (elapsed > fpsInterval) {
		lastFrameTime = currentFrameTime - (elapsed % fpsInterval);

		clearContext(context, canvas);
		renderGraphEdges(context, g.adj, g.coords);
		renderGraphNodes(context, g.adj, g.coords);
		// const sinceStart = currentFrameTime - startTime;
		// const currentFps = Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
		// const elapsedSinceStart = Math.round((sinceStart / 1000) * 100) / 100;
		// console.log(
		// 	'elapsed',
		// 	elapsedSinceStart,
		// 	'fps',
		// 	fps,
		// 	'since last frame',
		// 	Math.round((elapsed / 1000) * 1000) / 1000,
		// 	'currentFps',
		// 	currentFps,
		// 	'fpsInterval',
		// 	fpsInterval
		// );
	}
}

function clearContext(
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	color = canvasBackgroundColor
) {
	const width = Number(canvas.getAttribute('width'));
	const height = Number(canvas.getAttribute('height'));
	context.fillStyle = color;
	context.fillRect(0, 0, width, height);
}

function renderGraphNodes(
	context: CanvasRenderingContext2D,
	nodes: (Node | null)[],
	coords: Vector[]
) {
	context.font = textSize + ' Helvetica';
	context.lineWidth = lineWidth;
	const offset = 5;
	for (let i = 0; i < nodes.length; i++) {
		context.fillStyle = nodeBackgroundColor;
		context.strokeStyle = accentColor;
		context.beginPath();
		context.arc(coords[i].x, coords[i].y, nodeRadius, 0, 2 * Math.PI);
		context.fill();
		context.stroke();
		context.fillStyle = textColor;
		context.fillText(String(i), coords[i].x - offset, coords[i].y + offset);
	}
}

function renderGraphEdges(
	context: CanvasRenderingContext2D,
	nodes: (Node | null)[],
	coords: Vector[]
) {
	let node: Node | null = null;
	let curr: Node | null = null;

	context.lineWidth = lineWidth;
	context.fillStyle = nodeBackgroundColor;
	context.strokeStyle = lineColor;
	for (let i = 0; i < nodes.length; i++) {
		node = nodes[i];
		curr = node;
		while (curr != null) {
			context.beginPath();
			context.moveTo(coords[i].x, coords[i].y);
			context.lineTo(coords[curr.id].x, coords[curr.id].y);
			context.stroke();
			curr = curr.next;
		}
	}
}
