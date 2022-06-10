import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const calculateHash = async (currentDir, pathToFile, cb) => {
    pathToFile = path.isAbsolute(pathToFile) ?  path.normalize(pathToFile) : path.join(currentDir, pathToFile);
    const file = fs.readFile(pathToFile, 'utf-8', (err, buffer) => {
        if (err) {
            console.error("Operation failed");
            return;
        }
        const hash = crypto.createHash('sha256').update(buffer);
        console.log(hash.digest('hex'));
        cb();    
    });
};
