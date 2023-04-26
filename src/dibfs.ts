import Digraph from './dipraph';

const NO_PATH = -1;

export default class DiBfs {
	visited: boolean[];
	bfsTree: Digraph;
	path: number[];
	source: number;

	constructor(private graph: Digraph, s = 0) {
		this.path = new Array(graph.vertices).fill(NO_PATH);
		this.visited = new Array(graph.vertices).fill(false);
		this.bfsTree = new Digraph(graph.vertices);
		this.bfs(s);
		this.source = s;
	}

	private bfs(src: number) {
		// FIXME: quase certeza que essa fila não tem a complexidade de uma fila
		// tradicional.
		const queue: number[] = [src];
		while (queue.length !== 0) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const u = queue.shift()!;
			let v = this.graph.adj[u];
			while (v) {
				if (!this.visited[v.id]) {
					this.visited[v.id] = true;
					this.bfsTree.addEdge(u, v.id);
					this.path[v.id] = u;
					queue.push(v.id);
				}
				v = v.next;
			}
		}
	}

	pathTo(dst: number): number[] {
		const pathToDst: number[] = [];
		let v = dst;
		while (v !== this.source) {
			pathToDst.push(v);
			v = this.path[v];
			if (v === NO_PATH) return [];
		}
		pathToDst.push(this.source);
		return pathToDst.reverse();
	}
}
