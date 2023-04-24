import fs from 'fs';
import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';
import data from '../../data.json';

type SomeType = {
	users: User[];
	graph: _Node[];
};

let requestsMade = 0;

type Login = string;

type User = {
	login: Login;
	/** FIXME: GET nos membros de uma organização não contém o campo name. Por enquanto
	 * estamos preenchendo com login
	 */
	name: string;
	avatar_url: string;
};

type ApiUser = {
	id: number;
	login: Login;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: false;
};

const requestInit: RequestInit = {
	headers: {
		Accept: ' application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		Authorization: `Bearer ${GITHUB_TOKEN}`,
	},
};

interface _Node {
	login: Login;
	followers: Login[];
}

async function fetchFollowers(user: string): Promise<User[]> {
	let apiFollowers: ApiUser[] = [];
	const maxUsersPerPage = 100;

	let newFollowers: ApiUser[] = [];
	let page = 1;

	while (true) {
		const response = await fetch(
			`https://api.github.com/users/${user}/followers?` +
				new URLSearchParams({
					per_page: String(maxUsersPerPage),
					page: String(page),
				}),
			requestInit
		);
		requestsMade++;

		newFollowers = (await response.json()) as ApiUser[];
		apiFollowers = apiFollowers.concat(newFollowers);
		if (newFollowers.length < maxUsersPerPage) break;
		page++;
	}

	return apiFollowers.map((f) => ({ login: f.login, name: f.login, avatar_url: f.avatar_url }));
}

async function fetchMembers(page: number, maxUsersPerPage: number): Promise<User[]> {
	const org = 'projeto-de-algoritmos';

	const response = await fetch(
		`https://api.github.com/orgs/${org}/members?` +
			new URLSearchParams({
				filter: 'all',
				per_page: String(maxUsersPerPage),
				page: String(page),
			}),
		requestInit
	);
	requestsMade++;
	const members = (await response.json()) as ApiUser[];
	return members.map((m) => ({ login: m.login, name: m.login, avatar_url: m.avatar_url }));
}

async function getAllUsersFromGithub() {
	const users = new Set<User>();
	const graph = [];
	const maxUsersPerPage = 100;

	let newUsers: User[] = [];
	let page = 1;

	console.info('fetching members');
	while (true) {
		newUsers = await fetchMembers(page, maxUsersPerPage);
		newUsers.forEach((u) => users.add(u));
		if (newUsers.length < maxUsersPerPage) break;
		page++;
	}
	console.info('fetching members done');

	console.info('fetching followers of members');
	const newUsersFromFollowers = new Set<User>();
	for (const u of users) {
		console.info('fetching followers:', u.login);
		const followers = await fetchFollowers(u.login);

		const node: _Node = {
			login: u.login,
			followers: [],
		};

		followers.forEach((f) => {
			newUsersFromFollowers.add(f);
			node.followers.push(f.login);
		});

		graph.push(node);
		console.info('fetching followers:', u.login, followers.length);
	}
	console.info('fetching followers of members done');

	for (const u of newUsersFromFollowers) {
		if (!users.has(u)) users.add(u);
	}

	const u = Array.from(users);
	const data: { users: User[]; graph: _Node[] } = { users: u, graph };
	fs.writeFileSync('data.json', JSON.stringify(data, null, 1));
	console.log('u.length', u.length);
	console.log({ requestsMade });

	return {
		users: u,
		graph,
	};
}

export const load: PageServerLoad<SomeType> = async () => {
	// const dirContent = fs.readdirSync('.');
	// const data = await getAllUsersFromGithub()

	return data;
};
