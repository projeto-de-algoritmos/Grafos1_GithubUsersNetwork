import type Digraph from './dipraph';

interface Config {
	g: Digraph;
	xOffset?: number;
	yOffset?: number;
	xMax: number;
	yMax: number;
}

export function setCoordsRandomly({ g, xMax, yMax, yOffset = 0, xOffset = 0 }: Config) {
	for (let i = 0; i < g.coords.length; i++) {
		g.coords[i].x = Math.random() * xMax + xOffset;
		g.coords[i].y = Math.random() * yMax + yOffset;
	}
}
