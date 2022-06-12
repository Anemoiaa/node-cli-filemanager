import os from 'os';


export const get = (arg) => {
	try {
		const fn = args[arg];
		fn();
	} catch {
		process.stdout.write("Invalid opration\n");
	}
};

const getEOL = () => {
	console.log("EOL:", JSON.stringify(os.EOL));
};

const getHomeDir = () => {
	console.log("Home Directory:", os.homedir());
};

const getCpus = () => {
	const cpus = os.cpus();
	console.log("CPUS:", cpus.length);
	cpus.forEach(cpu => {
		console.log('-------------');
		console.log('Model:', cpu.model);
		console.log('Clock rate:', cpu.speed+'GHz');
	});
};

const getUsername = () => {
	console.log("Username:", os.userInfo().username);
};

const getArch = () => {
	console.log("Architecture:", os.arch());
};

const args = {
	'--EOL': getEOL,
	'--homedir': getHomeDir,
	'--cpus': getCpus,
	'--username': getUsername,
	'--architecture': getArch,
}
