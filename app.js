import  { EventEmitter } from 'events';
import os from 'os';
import { parseUsername } from './utils/parseUsername.js';
import { displayCurrentDir } from './utils/displayCurrentDir.js';
import * as nav from './navigation.js';
import * as fs_oper from './fs_operations.js';
import * as os_info from './get_os_info.js';
import { calculateHash } from './calcHash.js';

const welcomeUser = (username) => {
	process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
};

const username = parseUsername(process.argv[2]);
let currentDir = os.homedir();

welcomeUser(username);
displayCurrentDir(currentDir);



const emitter = new EventEmitter();

emitter.on('up', () => {
	currentDir = nav.up(currentDir);
	displayCurrentDir(currentDir);
});

emitter.on('cd', (args) => {
	const src = args[0];
	currentDir = nav.changeDir(currentDir, src);
	displayCurrentDir(currentDir);
});

emitter.on('ls', () => {
	nav.list(currentDir);
});

emitter.on('cat', (args) => {
	const src = args[0];
	fs_oper.read(currentDir, src);
});

emitter.on('add', (args) => {
	const filename = args[0];
	fs_oper.create(currentDir, filename);
});

emitter.on('rn', (args) => {
	const [pathToFile, new_filename] = args;
	fs_oper.rename(currentDir, pathToFile, new_filename);
});

emitter.on('rm', (args) => {
	const filename = args[0];
	fs_oper.remove(currentDir, filename);
});

emitter.on('cp', (args) => {
	const [pathToFile, pathToNewDir] = args;
	fs_oper.copy(currentDir, pathToFile, pathToNewDir);
});


emitter.on('mv', (args) => {
	const [pathToFile, pathToNewDir] = args;
	fs_oper.move(currentDir, pathToFile, pathToNewDir);
});


emitter.on('os', (args) => {
	os_info.get(args[0]);
	displayCurrentDir(currentDir);
});

emitter.on('hash', (args) => {
	const pathToFile = args[0];
	calculateHash(currentDir, pathToFile);

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