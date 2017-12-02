import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    const grid: number[][] = parseInput(input);

    console.log(`Part 1: ${solvePart1(grid)}`);
    console.log(`Part 2: ${solvePart2(grid)}`);
}

function parseInput(input: string): number[][] {
    const grid: number[][] = input
        .split('\n')
        .map(line => line
            .split('\t')
            .map(cell => parseInt(cell)));
    return grid;
}

function solvePart1(grid: number[][]) {
    let checksum = 0;
    grid.forEach(line => {
        checksum += Math.max(...line) - Math.min(...line);
    });
    return checksum;
}

function solvePart2(grid: number[][]) {
    let checksum = 0;
    grid.forEach(line => {
        line.forEach(divisor => {
            line.forEach(dividend => {
                if (divisor !== dividend
                    && Number.isInteger(dividend / divisor)) {
                    checksum += dividend / divisor;
                }
            });
        });
    });
    return checksum;
}

findSolution();
