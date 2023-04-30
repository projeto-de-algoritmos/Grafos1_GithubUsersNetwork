/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Vector } from '../defs';
import type Digraph from '../dipraph';
import type { Node } from '../dipraph';

const textSize = '8px';
const textColor = '#fff';
const accentColor = '#646cff';
const nodeBackgroundColor = '#242424';
const nodeSelectedColor = '#E3C240';

const nodeRadius = 8;
const canvasBackgroundColor = '#2e2e2e';
const lineWidth = 1;
const lineColor = '#646cff20';
const lineColorBfs = nodeSelectedColor;

// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
const fps = 60,
	fpsInterval = 1000 / fps;
let lastFrameTime = 0,
	frameCount = 1,
	currentFrameTime = 0,
	startTime = 0;
const shouldRender = true;
const requestAnimationFrameId = -1;

let g: Digraph;
let path: number[];
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

export function setDrawables(graph: Digraph, _canvas: HTMLCanvasElement, _path: number[]) {
	g = graph;
	canvas = _canvas;
	path = _path;
}

export function startRendering() {
	currentFrameTime = window.performance.now();
	startTime = currentFrameTime;
	frameCount = 1;
	context = canvas.getContext('2d')!;
	Render();
}

export function stopRendering() {
	console.log('stopping rendering');
	// shouldRender = false
	cancelAnimationFrame(requestAnimationFrameId);
}

function Render() {
	// requestAnimationFrameId = requestAnimationFrame(Render);

	currentFrameTime = window.performance.now();
	const elapsed = currentFrameTime - lastFrameTime;
	lastFrameTime = currentFrameTime;

	if (elapsed > fpsInterval) {
		lastFrameTime = currentFrameTime - (elapsed % fpsInterval);

		console.log('rendering');
		clearContext(context, canvas);
		renderGraphEdges(context, g.adj, g.coords, lineColor, lineWidth);
		renderPath(context, g.coords, path, lineColorBfs, lineWidth * 1.2);
		renderGraphNodes(context, g.adj, g.coords, g.selected);
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
	coords: Vector[],
	selected: boolean[]
) {
	context.font = textSize + ' Helvetica';
	context.lineWidth = lineWidth;
	const offset = 5;
	let isSelected = false;
	const selectedNodeRadius = nodeRadius * 1.2;
	for (let i = 0; i < nodes.length; i++) {
		isSelected = selected[i];
		context.fillStyle = nodeBackgroundColor;
		context.strokeStyle = isSelected ? nodeSelectedColor : accentColor;
		context.beginPath();
		context.arc(
			coords[i].x,
			coords[i].y,
			isSelected ? selectedNodeRadius : nodeRadius,
			0,
			2 * Math.PI
		);
		context.fill();
		context.stroke();
		context.fillStyle = textColor;
		context.fillText(String(i), coords[i].x - offset, coords[i].y + offset);
	}
}

function renderGraphEdges(
	context: CanvasRenderingContext2D,
	nodes: (Node | null)[],
	coords: Vector[],
	color: string,
	width: number
) {
	let node: Node | null = null;
	let curr: Node | null = null;

	context.lineWidth = width;
	context.fillStyle = nodeBackgroundColor;
	context.strokeStyle = color;
	// console.log(context.strokeStyle);

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

function renderPath(
	context: CanvasRenderingContext2D,
	coords: Vector[],
	path: number[],
	color: string,
	width: number
) {
	context.lineWidth = width;
	context.fillStyle = nodeBackgroundColor;
	context.strokeStyle = color;

	let currId = -1,
		prevId;
	for (let i = 1; i < path.length; ++i) {
		prevId = path[i - 1];
		currId = path[i];
		context.beginPath();
		context.moveTo(coords[prevId].x, coords[prevId].y);
		context.lineTo(coords[currId].x, coords[currId].y);
		context.stroke();
	}
}
