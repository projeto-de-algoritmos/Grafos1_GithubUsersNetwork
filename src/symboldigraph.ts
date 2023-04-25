import type { Login, _Node } from './defs';
import Digraph from './dipraph';

export default class SymbolGraph {
	table: Map<string, number>;
	keys: string[];
	g: Digraph;

	constructor(logins: Login[], connections: _Node[]) {
		this.table = new Map();
		this.keys = [];

		for (let i = 0; i < logins.length; i++) {
			this.keys.push(logins[i]);
			if (!this.table.has(logins[i])) {
				this.table.set(logins[i], i);
			}
		}

		let v: number | undefined;
		let w: number | undefined;
		this.g = new Digraph(logins.length);
		for (let i = 0; i < connections.length; i++) {
			const login = connections[i].login;

			v = this.table.get(login);
			if (v === undefined) {
				throw new Error('v is not defined in table for login: ' + login);
			}

			for (let f = 0; f < connections[i].followers.length; f++) {
				w = this.table.get(connections[i].followers[f]);
				if (w === undefined) {
					throw new Error('w is not defined in table for follower: ' + connections[i].followers[f]);
				}

				this.g.addEdge(w, v);
			}
		}
	}

	contains(s: string): boolean {
		return this.table.has(s);
	}

	id(s: string): number {
		const i = this.table.get(s);
		if (!i) return -1;
		return i;
	}

	name(v: number) {
		return this.keys[v];
	}

	graph() {
		return this.g;
	}
}
