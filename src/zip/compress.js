import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const currentPath = join(__dirname, 'files');
    const filePath = join(currentPath, 'fileToCompress.txt');
    const outputPath = join(currentPath, 'archive.gz');;

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(outputPath);
    const gzip = createGzip();

    const successMsgPart = `File compressed successfully to ${outputPath}`;

    readStream.pipe(gzip).pipe(writeStream);
    writeStream.on('finish', () => {
        console.log(successMsgPart);
    });
};

await compress();