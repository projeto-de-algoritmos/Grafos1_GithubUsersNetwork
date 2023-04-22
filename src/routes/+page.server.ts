import fs from 'fs';
import type { PageServerLoad } from './$types';

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

export const load: PageServerLoad<SomeType> = async () => {
	const dirContent = fs.readdirSync('.');

	const token = '...';
	const org = 'projeto-de-algoritmos';
	const response = await fetch(
		`https://api.github.com/orgs/${org}/members?` +
			new URLSearchParams({
				filter: 'all',
				per_page: '100',
				page: '3',
			}),
		{
			headers: {
				Accept: ' application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
				Authorization: `Bearer ${token}`,
			},
		}
	);
	const users: User[] = await response.json();

	return {
		dirContent,
		users,
	};
};
