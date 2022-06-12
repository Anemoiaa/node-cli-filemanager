import path from 'path';
import fs from 'fs';
import { displayCurrentDir } from '../utils/displayCurrentDir.js';
export const up = (currentDir) => {
	const newPath = path.resolve(currentDir, '../');
	if (fs.existsSync(newPath)) {
		return newPath;
	}
	console.error("Operation failed");
	return currentDir;
};


export const changeDir = (currentDir, src) => {
	try {
		const newPath = path.isAbsolute(src) ?  path.normalize(src) : path.join(currentDir, src);
		if (fs.existsSync(newPath)) {
			return newPath;
		}
		console.error("Operation failed");
		return currentDir;
	} catch {
		console.error("Operation failed");
		return currentDir;
	}
};

export const list = (currentDir) => {
	fs.readdir(currentDir, (err, files) => {
        if (err) console.error("Operation failed");;
        files.forEach(file => {
            console.log(file);
        });
        displayCurrentDir(currentDir);
    });	
};
