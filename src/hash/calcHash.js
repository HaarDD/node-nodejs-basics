import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const errorMsgPart = 'Error: ';
    const successMsgPart = 'SHA256 hash for file:';

    const hash = createHash('sha256');
    const readStream = createReadStream(filePath);

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        console.log(successMsgPart, hash.digest('hex'));
    });

    readStream.on('error', (error) => {
        console.error(errorMsgPart, error.message);
    });

};

await calculateHash();