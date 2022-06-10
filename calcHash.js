import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { displayCurrentDir } from './utils/displayCurrentDir.js';

export const calculateHash = async (currentDir, pathToFile, cb) => {
    try {
        pathToFile = path.isAbsolute(pathToFile) ?  path.normalize(pathToFile) : path.join(currentDir, pathToFile);
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }
    const file = fs.readFile(pathToFile, 'utf-8', (err, buffer) => {
        if (err) console.error("Operation failed");
        else {
            const hash = crypto.createHash('sha256').update(buffer);
            console.log(hash.digest('hex')); 
        }
        displayCurrentDir(currentDir);
    });
};
