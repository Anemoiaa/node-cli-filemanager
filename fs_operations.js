import fs from 'fs';
import path from 'path';
import { displayCurrentDir } from './utils/displayCurrentDir.js';


export const read = async (currentDir, src) => {
  try {
    const filePath = path.isAbsolute(src) ?  path.normalize(src) : path.join(currentDir, src);
    const stream = fs.createReadStream(filePath, 'utf-8');
    stream.on('data', chunk => process.stdout.write(chunk));
    stream.on('error', error => {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
    });
    stream.on('end', () => {
        process.stdout.write('\n');
        displayCurrentDir(currentDir);
    });
  } catch {
    console.error("Operation failed");
    displayCurrentDir(currentDir);
  }
};

export const create = async (currentDir, filename) => {
    try {
        fs.writeFile(path.join(currentDir, filename), '', { flag: 'wx'}, (err) => {
        if (err) console.error("Operation failed");
        else console.log(`${filename} created`);
        displayCurrentDir(currentDir);
        }); 
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
    }

};

export const rename = async (currentDir, pathToFile, new_filename) => {
    try {
        pathToFile = path.join(currentDir, pathToFile);
        new_filename = path.join(currentDir, new_filename);
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }

    if (!fs.existsSync(pathToFile) || fs.existsSync(new_filename)) {
        console.error("Operation failed");
    } else {
        fs.rename(pathToFile, new_filename, (err) => {
            if (err) console.error("Operation failed");
        });
    }
    displayCurrentDir(currentDir);
};


export const move = async (currentDir, pathToFile, pathToNewDir) => {
    try {
        pathToNewDir = path.isAbsolute(pathToNewDir) ?  path.normalize(pathToNewDir) : path.join(currentDir, pathToNewDir);
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }
    let filename = path.basename(pathToFile);
    await remove(currentDir, pathToFile);
    await create(pathToNewDir, filename);
};

export const copy = async(currentDir, pathToFile, pathToNewDir) => {
    try {
        pathToFile = path.join(currentDir, pathToFile);
        pathToNewDir = path.isAbsolute(pathToNewDir) ?  path.normalize(pathToNewDir) : path.join(currentDir, pathToNewDir);
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }
    let filename = path.basename(pathToFile);
    fs.cp(pathToFile, pathToNewDir+filename, (err) => {
        if (err) console.error("Operation failed");
        displayCurrentDir(currentDir);
    });
};

export const remove = async (currentDir, filename) => {
    let src;
    try {
        src = path.join(currentDir, filename);
    } catch {
        console.error("Operation failed");
        displayCurrentDir(currentDir);
        return;
    }

    fs.rm(src, (err) => {
        if (err) console.error("Operation failed");
        else console.log(`${filename} deleted`);
        displayCurrentDir(currentDir);
    });
};