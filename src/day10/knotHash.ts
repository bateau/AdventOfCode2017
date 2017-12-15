import * as fs from 'mz/fs';
const loopSize = 256;

export function knotHash(input: string) {
    let hashLengths = input.split('').map(chr => chr.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    let hashResult = hash(hashLengths, 64);
    let denseHash: number[] = [];
    hashResult.forEach((val: number, index: number) => {
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

export function hash(hashLengths: number[], iterations: number = 1): number[] {
    let list = new Array(loopSize).fill(0, 0, loopSize).map((val, i) => i);
    let skip = 0;
    let position = 0;

    for (let iterationCount = 0; iterationCount < iterations; iterationCount++) {
        for (let j = 0; j < hashLengths.length; j++) {
            let hashLength = hashLengths[j];
            reverse(list, position, hashLength);
            position = (position + hashLength + skip++) % list.length;
        }
    }

    return list;
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