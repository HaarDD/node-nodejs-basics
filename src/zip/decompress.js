import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const currentPath = join(__dirname, 'files');
    const filePath = join(currentPath, 'archive.gz');
    const outputPath = join(currentPath, 'fileToCompress.txt');

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(outputPath);
    const gunzip = createGunzip();

    const successMsg = `File decompressed successfully to ${outputPath}`;

    readStream.pipe(gunzip).pipe(writeStream);
    writeStream.on('finish', () => {
        console.log(successMsg);
    });
};

await decompress();