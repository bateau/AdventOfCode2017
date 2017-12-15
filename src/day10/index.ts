import * as fs from 'mz/fs';
import { knotHash, hash } from './knotHash';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let hashLengthsPart1 = input.split(',').map(length => parseInt(length));

    let hashedListPart1 = hash(hashLengthsPart1);
    console.log(`Part 1: ${hashedListPart1[0] * hashedListPart1[1]}`);

    let hashCode = knotHash(input);
    console.log(`Part 2: ${hashCode}`);
}

findSolution();