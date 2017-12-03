import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = parseInt(await fs.readFile(require.resolve(inputFilePath), 'utf8'));

    console.log(`Part1: ${solvePart1(input)}`);
}

function solvePart1(input: number) : number {
    // Find which ring the input number is on
    // Each ring has 8*(ring number) elements on it
    var { remainder, ring } = findCellOffsetDimensions(input);

    const quarterRingSize = ring * 2 || 1;
    let offset = (remainder - (ring - 1)) % quarterRingSize;
    let answer = Math.min(offset, quarterRingSize - offset) + ring;
    return answer;
}

interface MemoryCell {
    value: number;
    neighbors: number[];
}

function findCellOffsetDimensions(input: number) {
    let ring = 0;
    let step = 0;
    let countdown = input - 1;
    for (; countdown > 0; countdown -= step) {
        step += 8;
        ring++;
    }
    let remainder = countdown + step - 1;
    return { remainder, ring };
}

function solvePart2(input: number): number {
    let memory: MemoryCell[] = [];

    memory[1] = {
        value: 1,
        neighbors: findNeighbors(1)
    };

    // TODO: Finish
    return 0;

    function findNeighbors(cell: number): number[] {
        // TODO: Finish
        return [];
    }
}

findSolution();
