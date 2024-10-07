import { join, dirname } from 'node:path';
import { access, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const create = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __pathname = dirname(__filename);
    const filePath = join(__pathname, 'files', 'fresh.txt');

    const fileText = 'I am fresh and young';

    const accessErrors = ['ENOENT', 'ENOTDIR'];
    const errorMsg = 'FS operation failed';
    const successMsg = `File was created in ${filePath}!`;

    try {
        await access(filePath);
        throw new Error(errorMsg);
    } catch (error) {
        if (accessErrors.includes(error.code)){
            await writeFile(filePath, fileText);
            console.log(successMsg);
        } else {
            throw error;
        }
    }

};

await create();