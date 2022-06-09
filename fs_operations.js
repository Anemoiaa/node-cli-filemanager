import fs from 'fs';
import path from 'path';


export const read = async (currentDir, src, cb) => {
    const filePath = path.isAbsolute(src) ?  path.normalize(src) : path.join(currentDir, src);
    const stream = fs.createReadStream(filePath, 'utf-8');
    stream.on('data', chunk => process.stdout.write(chunk));
    stream.on('error', error => console.error("Operation failed"));
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