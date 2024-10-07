import { readdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const dirPath = join(__dirname, 'files');
    const errorMsg = 'FS operation failed';
    const successMsgPart = 'Files in directory:';

    try {
        await access(dirPath);
        const files = await readdir(dirPath);
        console.log(successMsgPart, files);
    } catch (error) {
        throw new Error(errorMsg);
    }
};

await list();