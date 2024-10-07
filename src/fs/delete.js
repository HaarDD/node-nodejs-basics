import { unlink, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToRemove.txt');

    const errorMsg = 'FS operation failed';
    const successMsg = `File ${filePath} has been removed successfully.`;

    try {
        await access(filePath);
        await unlink(filePath);
        console.log(successMsg);
    } catch (error) {
        throw new Error(errorMsg);
    }
};

await remove();