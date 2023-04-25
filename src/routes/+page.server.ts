import fs from 'fs';
import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';
// import data from '../../data.json';
import type { ApiUser, User, _Node, Login } from '../defs';

type Data = {
	users: User[];
	connections: _Node[];
};

let requestsMade = 0;

const requestInit: RequestInit = {
	headers: {
		Accept: ' application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		Authorization: `Bearer ${GITHUB_TOKEN}`,
	},
};

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
		if (response.status !== 200) {
			const error = await response.json();
			throw new Error(JSON.stringify(error, null, 1));
		}

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

	if (response.status !== 200) {
		const error = await response.json();
		throw new Error(JSON.stringify(error, null, 1));
	}
	requestsMade++;
	const members = (await response.json()) as ApiUser[];
	console.log({ members });

	return members.map((m) => ({ login: m.login, name: m.login, avatar_url: m.avatar_url }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getAllUsersFromGithub(): Promise<Data> {
	const users: User[] = [];
	const logins = new Set<Login>();
	const connections: _Node[] = [];
	const maxUsersPerPage = 100;

	let newUsers: User[] = [];
	let page = 1;

	console.info('fetching members');
	while (true) {
		newUsers = await fetchMembers(page, maxUsersPerPage);
		newUsers.forEach((u) => {
			users.push(u);
			logins.add(u.login);
		});
		if (newUsers.length < maxUsersPerPage) break;
		page++;
	}
	console.info('fetching members done');

	// console.info('fetching followers of members');
	// let i = 0;
	// for (const u of users) {
	// 	console.info(
	// 		`requests made ${requestsMade} u ${i}/${users.length} | fetching followers: ${u.login}`
	// 	);
	// 	const followers = await fetchFollowers(u.login);
	// 	followers.forEach((f) => {
	// 		if (!logins.has(f.login)) users.push(f);
	// 		logins.add(f.login);
	// 	});

	// 	const node: _Node = {
	// 		login: u.login,
	// 		followers: [],
	// 	};

	// 	followers.forEach((f) => {
	// 		node.followers.push(f.login);
	// 		// if (!logins.has(f.login)) {
	// 		// 	users.push(f);
	// 		// 	logins.add(f.login);
	// 		// }
	// 	});

	// 	connections.push(node);
	// 	i++;
	// 	console.info('fetching followers:', u.login, followers.length);
	// }
	// console.info('fetching followers of members done');

	const data: Data = { users, connections };
	fs.writeFileSync('data.json', JSON.stringify(data, null, 1));
	console.log('u.length', users.length);
	console.log({ requestsMade });

	return data;
}

export const load: PageServerLoad<Data> = async () => {
	const data = await getAllUsersFromGithub();
	return data;
};
