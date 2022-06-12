import path from 'path';
import fs from 'fs';
import zlib  from 'zlib';
import { displayCurrentDir } from '../utils/displayCurrentDir.js';

export const compress = async (currentDir, pathToFile, pathToDest) => {
    let filename 
    try {
        filename = path.basename(pathToFile);
        pathToFile = path.isAbsolute(pathToFile) ?  path.normalize(pathToFile) : path.join(currentDir, pathToFile);
        pathToDest = path.isAbsolute(pathToDest) ?  path.normalize(pathToDest) : path.join(currentDir, pathToDest+filename+'.br');
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }

    const read = fs.createReadStream(pathToFile);
    const write = fs.createWriteStream(pathToDest);
    const brotliCompress = zlib.createBrotliCompress();
    
    read.pipe(brotliCompress).pipe(write);
    write.on('finish', () => displayCurrentDir(currentDir));
    write.on('error', () => {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
    });
}


export const decompress = async (currentDir, pathToFile, pathToDest) => {
    try {
        let filename = path.parse(pathToFile).name;
        pathToFile = path.join(currentDir, pathToFile);
        pathToDest = path.join(currentDir, pathToDest, filename);
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }
    console.log(pathToFile);
    console.log(pathToDest);
    if (!fs.existsSync(pathToFile)) {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }
    const read = fs.createReadStream(pathToFile);
    const write = fs.createWriteStream(pathToDest);
    const brotliCompress = zlib.createBrotliCompress();
    
    read.pipe(brotliCompress).pipe(write);
    write.on('finish', () => displayCurrentDir(currentDir));
    write.on('error', () => {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
    });
}