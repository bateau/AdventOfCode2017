import * as fs from 'mz/fs';
import { knotHash } from '../day10/index';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let usedSquares = 0;
    for (let i = 0; i < 128; i++) {
        let seed = `${input}-${i}`;
        let hashString = knotHash(seed);
        let bits = 0;
        hashString.split('').forEach(digit => {
            bits += countBitsInHexDigit(digit);
        });
        console.log(`${seed} -> ${hashString} -> ${bits}`);
        usedSquares += bits
    }

    console.log(usedSquares);
}

function countBitsInHexDigit(hexDigit: string) {
    switch (hexDigit) {
        case '0':
            return 0;
        case '1':
        case '2':
        case '4':
        case '8':
            return 1;
        case '3':
        case '5':
        case '9':
        case '6':
        case 'a':
        case 'c':
            return 2;
        case '7':
        case 'b':
        case 'd':
        case 'e':
            return 3;
        case 'f':
            return 4;
    }

    throw new Error('Invalid hex digit');
}

findSolution();