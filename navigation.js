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