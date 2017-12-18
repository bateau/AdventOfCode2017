import * as fs from 'mz/fs';
import { knotHash } from '../day10/knotHash';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let grid: number[][] = [];

    for (let i = 0; i < 128; i++) {
        let seed = `${input}-${i}`;
        let hashString = knotHash(seed);
        grid[i] = setBitsInRow(hashString);
    }

    console.log(`Part 1: ${countUsedCells(grid)}`);
    console.log(`Part 2: ${countGroupsInGrid(grid)}`);
}

function countUsedCells(grid: number[][]): any {
    return grid.reduce((total, row) => {
        return total + row.reduce((rowTotal, cell) => {
            return rowTotal + (cell >= 0 ? 1 : 0);
        }, 0);
    }, 0);
}

function setBitsInRow(hashString: string) {
    let row: number[] = [];
    hashString.split('').forEach((hexDigit, i) => {
        let byte = parseInt(hexDigit, 16);
        for (let offset = 1; offset <= 4; offset++) {
            row[4 * (i + 1) - offset] = byte % 2 === 1 ? 0 : -1
            byte = Math.floor(byte / 2);
        }
    });

    return row;
}

function countGroupsInGrid(grid: number[][]): number {
    let groupCount = 1;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                markGroup(grid, i, j, groupCount++);
            }
        }
    }

    return groupCount - 1;
}

interface Coord {
    x: number;
    y: number;
}

function markGroup(grid: number[][], row: number, col: number, groupId: number) {
    let queue: Coord[] = [{ x: row, y: col }];

    grid[row][col] = groupId;

    while (queue.length) {
        let { x, y } = queue.shift()!;

        [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 },
        ].forEach(coord => {
            let { x, y } = coord;
            if (grid[x] && grid[x][y] === 0) {
                grid[x][y] = groupId;
                queue.push({
                    x,
                    y
                });
            }
        });
    }
}

findSolution();