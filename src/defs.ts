export type Login = string;

export type User = {
	login: Login;
	/** FIXME: GET nos membros de uma organização não contém o campo name. Por enquanto
	 * estamos preenchendo com login
	 */
	name: string;
	avatar_url: string;
};

export type ApiUser = {
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

export interface _Node {
	login: Login;
	followers: Login[];
}
