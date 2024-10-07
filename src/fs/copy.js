import { cp, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __pathname = dirname(__filename);

    const sourcePath = join(__pathname, 'files');
    const destinationPath = join(__pathname, 'files_copy');

    const accessErrors = ['ENOENT', 'ENOTDIR'];
    const errorMsg = 'FS operation failed';
    const successMsg = `Directory: ${sourcePath}\nwas succesfully copied in:\n${destinationPath}!`;

    try {
        await stat(sourcePath);
    } catch {
        throw new Error(errorMsg);
    }

    try {
        await stat(destinationPath);
        throw new Error(errorMsg);
    } catch (error) {
        console.log(error);
        if (accessErrors.includes(error.code)) {
            await cp(sourcePath, destinationPath, { recursive: true });
            console.log(successMsg);
        }
        else {
            throw error;
        }
    }

};

await copy();
