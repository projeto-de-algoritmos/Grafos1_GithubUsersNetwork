type Login = string;

interface User {
	id: number;
	login: string;
	name: string;
	avatar_url: string;
	// Alternativa:
	// following: Login[];
	// followers: Login[];
}

interface _Node {
	login: string;
	following: Login[];
	followers: Login[];
}
interface Data {
	users: User[];
	graph: _Node[];
}

export const data: Data = {
	users: [
		{
			id: 1,
			login: 'yudi-azvd',
			name: 'Yudi Yamane',
			avatar_url: '.....',
		},
	],
	graph: [
		{
			login: 'yudi-azvd',
			following: ['user 1', 'user 2'],
			followers: ['user 1', 'user 2'],
		},
		{
			login: 'victorAlves7',
			following: ['user 1', 'user 2'],
			followers: ['user 1', 'user 2'],
		},
	],
};
