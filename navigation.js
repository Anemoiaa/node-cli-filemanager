import path from 'path';
import fs from 'fs';

export const up = (currentDir) => {
	const newPath = path.resolve(currentDir, '../');
	if (fs.existsSync(newPath)) {
		return newPath;
	}
	console.error("Operation failed");
	return currentDir;
};


export const changeDir = (currentDir, src) => {
	const newPath = path.isAbsolute(src) ?  path.normalize(src) : path.join(currentDir, src);
	if (fs.existsSync(newPath)) {
		return newPath;
	}
	console.error("Operation failed");
	return currentDir;

};

export const list = (currentDir, cb) => {
	fs.readdir(currentDir, (err, files) => {
        if (err) console.error("Operation failed");;
        files.forEach(file => {
            console.log(file);
        });
        cb();
    });	
};
