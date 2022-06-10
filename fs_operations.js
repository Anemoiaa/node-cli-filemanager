import fs from 'fs';
import path from 'path';


export const read = async (currentDir, src, cb) => {
    const filePath = path.isAbsolute(src) ?  path.normalize(src) : path.join(currentDir, src);
    const stream = fs.createReadStream(filePath, 'utf-8');
    stream.on('data', chunk => process.stdout.write(chunk));
    stream.on('error', error => {
        console.error("Operation failed");
        cb();
    });
    stream.on('end', () => {
        process.stdout.write('\n');
        cb();
    });
};

export const create = async (currentDir, filename, cb) => {
    fs.writeFile(path.join(currentDir, filename), '', { flag: 'wx'}, (err) => {
        if (err) console.error("Operation failed");
        else console.log(`${filename} created`);
        cb();
    });
};

export const rename = async (currentDir, pathToFile, new_filename, cb) => {
    pathToFile = path.join(currentDir, pathToFile);
    new_filename = path.join(currentDir, new_filename);
    if (!fs.existsSync(pathToFile) || fs.existsSync(new_filename)) {
        console.error("Operation failed");
    } else {
        fs.rename(pathToFile, new_filename, (err) => {
            if (err) console.error("Operation failed");
        });
    }
    cb();
};

export const remove = async (currentDir, filename, cb) => {
    const src = path.join(currentDir, filename);
    fs.rm(src, (err) => {
        if (err) {
            console.error("Operation failed");
            return;
        }
        console.log(`${filename} deleted`);
        cb();
    });
};