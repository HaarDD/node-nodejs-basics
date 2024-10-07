import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    const readStream = createReadStream(filePath, { encoding: 'utf8' });

    const errorMsgPart = 'Error: ';
    const successMsgPart = '\nFile has been read!';

    console.log('---\tfile\tstart\t---')
    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        console.log('\n---\tfile\tend\t---')
        console.log(successMsgPart)
    });
    

    readStream.on('error', (error) => {
        console.error(errorMsgPart,error.message);
    });
};

await read();