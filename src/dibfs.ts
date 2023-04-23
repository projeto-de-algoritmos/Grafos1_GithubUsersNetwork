import Digraph from './dipraph';

export default class DiBfs {
	visited: boolean[];
	bfsTree: Digraph;

	constructor(private graph: Digraph, s = 0, d = 0) {
		this.visited = new Array(graph.vertices).fill(false);
		this.bfsTree = new Digraph(graph.vertices);
		this.bfs(s);
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
					this.bfsTree.addEdge(v.id, u);
					queue.push(v.id);
				}
				v = v.next;
			}
		}
	}

	/**
	 * Não foi implementado!
	 */
	distance(v: number, w: number): number {
		throw new Error('Not implemented');
	}
}
