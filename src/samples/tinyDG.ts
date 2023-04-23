import type Digraph from '../dipraph';
import type { GraphSample } from './sample';

const graph = `13
22
4  2
2  3
3  2
6  0
0  1
2  0
11 12
12  9
9 10
9 11
7  9
10 12
11  4
4  3
3  5
7  8
8  7
5  4
0  5
6  4
6  9
7  6`;

function setCoords(g: Digraph, scale = 1) {
	g.coords[0].x = 10 * scale;
	g.coords[0].y = 10 * scale;

	g.coords[1].x = 20 * scale;
	g.coords[1].y = 20 * scale;

	g.coords[2].x = 40 * scale;
	g.coords[2].y = 20 * scale;

	g.coords[3].x = 20 * scale;
	g.coords[3].y = 40 * scale;

	g.coords[4].x = 40 * scale;
	g.coords[4].y = 45 * scale;

	g.coords[5].x = 10 * scale;
	g.coords[5].y = 50 * scale;

	g.coords[6].x = 60 * scale;
	g.coords[6].y = 15 * scale;

	g.coords[7].x = 80 * scale;
	g.coords[7].y = 15 * scale;

	g.coords[8].x = 95 * scale;
	g.coords[8].y = 15 * scale;

	g.coords[9].x = 80 * scale;
	g.coords[9].y = 40 * scale;

	g.coords[10].x = 95 * scale;
	g.coords[10].y = 40 * scale;

	g.coords[11].x = 80 * scale;
	g.coords[11].y = 55 * scale;

	g.coords[12].x = 95 * scale;
	g.coords[12].y = 55 * scale;
}

const label = 'tiny DG';
export const tinyDG: GraphSample = {
	label,
	setCoords,
	sample: graph,
};
