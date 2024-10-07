import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const errorMsg = 'FS operation failed';
    const successMsgPart = `Content of file \"${filePath}\":\n`;

    try {
        await access(filePath);
        const data = await readFile(filePath, 'utf-8');
        console.log(successMsgPart, data);
    } catch (error) {
        throw new Error(errorMsg);
    }
};

await read();