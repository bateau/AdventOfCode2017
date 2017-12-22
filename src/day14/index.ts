import * as fs from 'mz/fs';
import {knotHash} from '../day10/knotHash'; 

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');
    var hashes : string[] = new Array(128);
    var setBitCount = 0;
    for (var i=0; i<128; i++)
    {
        hashes[i] = knotHash(input+'-'+i);
        setBitCount += countBitsInString(hashes[i]);
    }

    console.log(setBitCount);
}

function countBits(n: number) : number {
    var count=0;
    while (n)
    {
        n &= (n-1);
        count++;
    }
    return count;
}

function countBitsInString(input : string) : number {
    var count =0;
    for (var i=0; i< input.length; i++)
    {
        count += countBits(Number.parseInt(input[i], 16));
    }
    return count;
}

 findSolution();
// console.log(countBits(9));