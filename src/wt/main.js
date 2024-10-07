import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const numCPUs = cpus().length;
    const results = [];

    const workerPromises = Array.from({ length: numCPUs }, (_, index) => {
        return new Promise((resolve) => {
            const worker = new Worker(join(__dirname, 'worker.js'));

            worker.postMessage(10 + index);

            worker.on('message', (result) => {
                results[index] = result;
                resolve();
            });

            worker.on('error', (error) => {
                results[index] = { status: 'error', data: null };
                resolve();
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    results[index] = { status: 'error', data: null };
                    resolve();
                }
            });
        });
    });

    await Promise.all(workerPromises);
    console.log(results);
};

await performCalculations();
