import { parseUsername } from './utils/parseUsername.js';

const welcomeUser = (username) => {
	process.stdout.write(`Welcome to the File Manager, ${username}!`);
} 

const username = parseUsername(process.argv[2]);
welcomeUser(username);