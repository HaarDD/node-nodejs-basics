import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = (args) => {
    const child = spawn('node', [join(__dirname, 'files', 'script.js'), ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(child.stdin);

    child.stdout.on('data', (data) => {
        process.stdout.write(data); 
    });
};

spawnChildProcess(['arg1', 'arg2']);