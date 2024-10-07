import { rename as renameFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const currentPath = join(__dirname, 'files');
    const sourcePath = join(currentPath, 'wrongFilename.txt');
    const destinationPath = join(currentPath, 'properFilename.md');

    const accessErrors = ['ENOENT', 'ENOTDIR'];
    const errorMsg = 'FS operation failed';
    const successMsg = `File: ${sourcePath}\n was renamed to:\n${destinationPath}!`;

    try {
        await access(sourcePath);

        try {
            await access(destinationPath);
            throw new Error(errorMsg);
        } catch (error) {
            if (!accessErrors.includes(error.code)) {
                throw error;
            }
        }

        await renameFile(sourcePath, destinationPath);
        console.log(successMsg);
    } catch (error) {
        throw new Error(errorMsg);
    }
};

await rename();