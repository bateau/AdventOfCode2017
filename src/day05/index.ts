import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    console.log(`Part 1: ${countJumpsWithinJumpTable(input, part1Transform)}`);
    console.log(`Part 2: ${countJumpsWithinJumpTable(input, part2Transform)}`);
}

function part1Transform(jumpTable: number[], pointer: number): void {
    jumpTable[pointer]++;
}

function part2Transform(jumpTable: number[], pointer: number): void {
    jumpTable[pointer] += jumpTable[pointer] >= 3 ? -1 : 1;
}

function countJumpsWithinJumpTable(input: string, jumpTableEntryTransform: (jumpTable: number[], pointer: number) => void) {
    let jumpTable = createJumpTable(input);
    let count = 0;
    let pointer = 0;
    while (pointer >= 0 && pointer < jumpTable.length) {
        let oldPointer = pointer;
        pointer += jumpTable[pointer];
        jumpTableEntryTransform(jumpTable, oldPointer);
        count++;
    }
    return count;
}

function createJumpTable(input: string): number[] {
    return input.split('\n').map(num => parseInt(num));
}

findSolution();
