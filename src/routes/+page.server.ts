import fs from 'fs';
import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';

type SomeType = {
	dirContent: string[];
	users: User[];
	graph: _Node[];
};

type User = {
	id: number;
	login: string;
	avatar_url: string;
	followers_url: string;
	following_url: string;
};

const requestInit: RequestInit = {
	headers: {
		Accept: ' application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		Authorization: `Bearer ${GITHUB_TOKEN}`,
	},
};
type Login = string;

interface _Node {
	login: string;
	followers: Login[];
}

async function fetchFollowers(user: string) {
	let followers: User[] = [];
	const maxUsersPerPage = 100;

	let newFollowers: User[] = [];
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

		newFollowers = (await response.json()) as User[];
		followers = followers.concat(newFollowers);
		if (newFollowers.length < maxUsersPerPage) break;
		page++;
	}

	return followers;
}

async function fetchMembers(page: number, maxUsersPerPage: number) {
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

	return (await response.json()) as User[];
}

export const load: PageServerLoad<SomeType> = async () => {
	const dirContent = fs.readdirSync('.');

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
	for (const u of users) {
		console.info('fetching followers:', u.login);
		const followers = await fetchFollowers(u.login);

		const node: _Node = {
			login: u.login,
			followers: [],
		};

		followers.forEach((f) => {
			users.add(f);
			node.followers.push(f.login);
		});

		graph.push(node);
		console.info('fetching followers:', u.login, followers.length);
	}
	console.info('fetching followers of members done');

	const u = Array.from(users);

	fs.writeFileSync('data.json', JSON.stringify({ users, graph }));

	return {
		dirContent,
		users: u,
		graph,
	};
};
