import Digraph from '../src/dipraph';
import DiBfs from '../src/dibfs';
import { tinyDG } from '../src/samples/tinyDG';

import { describe, it, expect } from 'vitest';

let g: Digraph;
let b: DiBfs;

describe('DiBfs', () => {
	it('pathTo: source 0', () => {
		g = Digraph.fromString(tinyDG.sample);
		b = new DiBfs(g, 0);

		expect(b.pathTo(5)).toStrictEqual([0, 5]);
		expect(b.pathTo(2)).toStrictEqual([0, 5, 4, 2]);
		expect(b.pathTo(3)).toStrictEqual([0, 5, 4, 3]);

		expect(b.pathTo(11)).toStrictEqual([]);
		expect(b.pathTo(10)).toStrictEqual([]);
		expect(b.pathTo(6)).toStrictEqual([]);
	});

	it('pathTo: source 12', () => {
		g = Digraph.fromString(tinyDG.sample);
		b = new DiBfs(g, 12);

		expect(b.pathTo(9)).toStrictEqual([12, 9]);
		expect(b.pathTo(11)).toStrictEqual([12, 9, 11]);
		expect(b.pathTo(4)).toStrictEqual([12, 9, 11, 4]);
		expect(b.pathTo(2)).toStrictEqual([12, 9, 11, 4, 2]);

		expect(b.pathTo(8)).toStrictEqual([]);
		expect(b.pathTo(7)).toStrictEqual([]);
	});
});
