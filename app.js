import  { EventEmitter } from 'events';
import os from 'os';
import { parseUsername } from './utils/parseUsername.js';
import * as nav from './navigation.js';
import * as fs_oper from './fs_operations.js';

const welcomeUser = (username) => {
	process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
	displayCurrentDir();
};

const displayCurrentDir = () => {
	process.stdout.write(`\nYou are currently in ${currentDir}\nEnter command:\n`);
};


const username = parseUsername(process.argv[2]);
let currentDir = os.homedir();
welcomeUser(username);


const emitter = new EventEmitter();


emitter.on('up', () => {
	currentDir = nav.up(currentDir);
	displayCurrentDir();
});

emitter.on('cd', (args) => {
	const src = args[0];
	if (!src) return;
	currentDir = nav.changeDir(currentDir, src);
	displayCurrentDir();
});

emitter.on('ls', () => {
	nav.list(currentDir, displayCurrentDir);
});

emitter.on('cat', (args) => {
	const src = args[0];
	if(!src) return;
	fs_oper.read(currentDir, src, displayCurrentDir);
});

emitter.on('add', (args) => {
	const filename = args[0];
	if(!filename) return;
	fs_oper.create(currentDir, filename, displayCurrentDir);
});

emitter.on('rn', (args) => {
	const [pathToFile, new_filename] = args;
	if (!pathToFile || !new_filename) return;
	fs_oper.rename(currentDir, pathToFile, new_filename, displayCurrentDir);
});

emitter.on('rm', (args) => {
	const filename = args[0];
	if(!filename) return;
	fs_oper.remove(currentDir, filename, displayCurrentDir);
});



emitter.once('.exit', () => {
	process.stdout.write(`\nThank you for using File Manager, ${username}!`);
	process.exit(0);
});

process.on('SIGINT', () => emitter.emit('.exit'));

process.stdin.on('data', (data) => {
	const [command, ...args] = data.toString().replace(os.EOL, '').replace('\n', '').split(' ');
	const commandIsCorrect = emitter.emit(command, args);
	if(!commandIsCorrect) process.stdout.write("Invalid opration\n");
});