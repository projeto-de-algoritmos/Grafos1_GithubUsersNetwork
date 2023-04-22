import fs from 'fs';
import type { PageServerLoad } from './$types';
import { GITHUB_TOKEN } from '$env/static/private';

type SomeType = {
	dirContent: string[];
	users: User[];
};

type User = {
	id: number;
	login: string;
	avatar_url: string;
	followers_url: string;
	following_url: string;
};

async function fetchUsers(page: number, maxUsersPerPage: number) {
	const org = 'projeto-de-algoritmos';

	const response = await fetch(
		`https://api.github.com/orgs/${org}/members?` +
			new URLSearchParams({
				filter: 'all',
				per_page: String(maxUsersPerPage),
				page: String(page),
			}),
		{
			headers: {
				Accept: ' application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
				Authorization: `Bearer ${GITHUB_TOKEN}`,
			},
		}
	);

	return (await response.json()) as User[];
}

export const load: PageServerLoad<SomeType> = async () => {
	const dirContent = fs.readdirSync('.');

	let users: User[] = [];
	const maxUsersPerPage = 100;

	let newUsers: User[] = [];
	let page = 1;
	while (true) {
		newUsers = await fetchUsers(page, maxUsersPerPage);
		users = users.concat(newUsers);
		if (newUsers.length < maxUsersPerPage) break;
		page++;
	}

	return {
		dirContent,
		users,
	};
};
