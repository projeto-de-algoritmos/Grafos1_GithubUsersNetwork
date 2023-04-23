import type Digraph from '../dipraph';

export type GraphSample = {
	sample: string;
	label: string;
	setCoords: (g: Digraph, scale: number) => void;
};
