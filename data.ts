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
			followers: ['vitoaAlve7', 'user 2'],
		},
		{
			login: 'victorAlves7',
			followers: ['yudi-azvd', 'user 2'],
		},
	],
};
