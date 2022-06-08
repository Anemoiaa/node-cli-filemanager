import  { EventEmitter } from 'events';
import os from 'os';
import { parseUsername } from './utils/parseUsername.js';

const welcomeUser = (username) => {
	process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
	process.stdout.write(`Enter command:`);
} 


const username = parseUsername(process.argv[2]);
let currentDir = os.homedir();
welcomeUser(username);


const emitter = new EventEmitter();

emitter.once('.exit', () => {
	process.stdout.write(`Thank you for using File Manager, ${username}!`);
	process.exit(0);
});

process.on('SIGINT', () => emitter.emit('.exit'));

process.stdin.on('data', (data) => {
	const [command, ...args] = data.toString().replace(os.EOL, '').replace('\n', '').split(' ');
	const commandIsCorrect = emitter.emit(command, args);
	if(!commandIsCorrect) process.stdout.write("Invalid opration\n");
});