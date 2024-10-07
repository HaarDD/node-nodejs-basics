import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');

    const writeStream = createWriteStream(filePath);

    const errorMsgPart = 'Error: ';
    const successMsgPart = `Data has been written to file:\n${filePath}`;
    const endMsg = 'Received Ctrl + C. Ending write stream...';

    process.on('SIGINT', () => {
        console.log('');
        writeStream.end(() => {
            console.log(endMsg);
            console.log(successMsgPart);
            process.exit(0);
        });
    });

    process.stdin.on('data', (chunk) => {
        writeStream.write(chunk);
    });

    process.stdin.on('end', () => {
        writeStream.end();
        console.log(successMsgPart);
    });

    process.stdin.on('error', (error) => {
        console.error(errorMsgPart, error.message);
    });
};

await write();