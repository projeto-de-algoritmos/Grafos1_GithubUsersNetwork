// import Digraph from '@/0-graphs/digraph'
// import { tinyDG } from '@/0-graphs/samples/tinyDG'

import { describe, it, expect } from 'vitest';
import Digraph from '../src/dipraph';
import { tinyDG } from '../src/samples/tinyDG';

let g: Digraph;

describe('Digraph', () => {
	it('has edges', () => {
		g = Digraph.fromString(tinyDG.sample);

		expect(g.hasEdge(0, 1)).toEqual(true);
		expect(g.hasEdge(2, 0)).toEqual(true);
		expect(g.hasEdge(4, 2)).toEqual(true);
		expect(g.hasEdge(2, 3)).toEqual(true);
		expect(g.hasEdge(3, 2)).toEqual(true);
		expect(g.hasEdge(7, 8)).toEqual(true);
		expect(g.hasEdge(8, 7)).toEqual(true);

		expect(g.hasEdge(1, 0)).toEqual(false);
		expect(g.hasEdge(9, 6)).toEqual(false);
		expect(g.hasEdge(4, 5)).toEqual(false);
		expect(g.hasEdge(4, 11)).toEqual(false);
		expect(g.hasEdge(9, 12)).toEqual(false);
	});

	it('reversed', () => {
		g = Digraph.fromString(tinyDG.sample);
		const r = g.reversed();

		expect(r.hasEdge(0, 1)).toEqual(false);
		expect(r.hasEdge(2, 0)).toEqual(false);
		expect(r.hasEdge(4, 2)).toEqual(false);

		expect(r.hasEdge(2, 3)).toEqual(true);
		expect(r.hasEdge(3, 2)).toEqual(true);
		expect(r.hasEdge(7, 8)).toEqual(true);
		expect(r.hasEdge(8, 7)).toEqual(true);

		expect(r.hasEdge(1, 0)).toEqual(true);
		expect(r.hasEdge(9, 6)).toEqual(true);
		expect(r.hasEdge(4, 5)).toEqual(true);
		expect(r.hasEdge(4, 11)).toEqual(true);
		expect(r.hasEdge(9, 12)).toEqual(true);
	});
});
