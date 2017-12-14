import * as fs from 'mz/fs';
const loopSize = 256;

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let hashLengthsPart1 = input.split(',').map(length => parseInt(length));
    let list = new Array(loopSize).fill(0, 0, loopSize).map((val, i) => i);

    let hashedListPart1 = hash(list, hashLengthsPart1);
    console.log(`Part 1: ${hashedListPart1[0] * hashedListPart1[1]}`);

    let hashCode = knotHash(input);
    console.log(`Part 2: ${hashCode}`);
}

export function knotHash(input: string) {
    let list = new Array(loopSize).fill(0, 0, loopSize).map((val, i) => i);
    let hashLengthsPart2 = input.split('').map(chr => chr.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    let hashedListPart2 = hash(list, hashLengthsPart2, 64);
    let denseHash: number[] = [];
    hashedListPart2.forEach((val: number, index: number) => {
        let denseIndex = Math.floor(index / 16);
        denseHash[denseIndex] ^= val;
    });
    let hashCode = denseHash
        .map(val => {
            let digits = val.toString(16);
            return digits.length === 1 ? `0${digits}` : digits;
        }).join('');
    return hashCode;
}

function hash(list: number[], hashLengths: number[], iterations: number = 1): number[] {
    let listCopy = [...list];
    let skip = 0;
    let position = 0;

    for (let iterationCount = 0; iterationCount < iterations; iterationCount++) {
        for (let j = 0; j < hashLengths.length; j++) {
            let hashLength = hashLengths[j];
            reverse(listCopy, position, hashLength);
            position = (position + hashLength + skip++) % listCopy.length;
        }
    }

    return listCopy;
}

function reverse(list: number[], start: number, hashLength: number): void {
    if (start + hashLength <= list.length) {
        list.splice(start, hashLength, ...list.slice(start, start + hashLength).reverse());
    } else {
        let itemsFromEnd = list.length - start;
        let subList = [...list.slice(start, list.length), ...list.slice(0, hashLength - itemsFromEnd)].reverse();
        list.splice(start, itemsFromEnd, ...subList.slice(0, itemsFromEnd));
        list.splice(0, hashLength - itemsFromEnd, ...subList.slice(itemsFromEnd, subList.length));
    }
}

findSolution();