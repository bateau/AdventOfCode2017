import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input: string = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    const numStream = parseInput(input);
    const streamSize = numStream.length;

    function calculateCaptcha(offset: number) {
        let runningTotal = 0;
        for (let i = 0; i < streamSize; i++) {
            if (numStream[i] === numStream[(i + offset) % streamSize]) {
                runningTotal += numStream[i];
            }
        }

        return runningTotal;
    }

    console.log(`Part 1: ${calculateCaptcha(1)}`);
    console.log(`Part 2: ${calculateCaptcha(streamSize / 2)}`);
}

function parseInput(input: string): number[] {
    return input.split('').map(chr => parseInt(chr));
}

findSolution();