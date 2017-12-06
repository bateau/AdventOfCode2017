import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let memoryBank = input.split('\t').map(num => parseInt(num));

    let seenStates: { [stateKey: string]: number} = {};
    let iteration = 0;
    while (getFirstIterationOfCurrentState() === undefined) {
        seenStates[getStateKey()] = iteration++;

        let largestBlockSize = Math.max(...memoryBank);
        let largestBlockIndex = memoryBank.indexOf(largestBlockSize);
        memoryBank[largestBlockIndex] = 0

        for (let i = 1; i <= largestBlockSize; i++) {
            memoryBank[(i + largestBlockIndex) % memoryBank.length]++;
        }
    }

    console.log(`Part 1: ${Object.keys(seenStates).length}`);
    console.log(`Part 2: ${Object.keys(seenStates).length - getFirstIterationOfCurrentState()!}`);

    function getStateKey() {
        return memoryBank.join('-');
    }

    function getFirstIterationOfCurrentState(): number | undefined {
        return seenStates[getStateKey()];
    }
}

findSolution();