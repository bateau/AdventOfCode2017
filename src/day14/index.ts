import * as fs from 'mz/fs';
import {knotHash} from '../day10/knotHash'; 

var hashes : string[] = new Array(128);
var bits : string[] = new Array(128);
var group = 0;

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    var setBitCount = 0;
    for (var i=0; i<128; i++)
    {
        hashes[i] = knotHash(input+'-'+i);
        bits[i] = "";
        // setBitCount += countBitsInString(hashes[i]);
        for (var j = 0; j < 32; j++) {
            var str = Number.parseInt(hashes[i][j], 16).toString(2).replace(new RegExp("1", "g"), "#");
            while (str.length < 4)
            {
                str = "0" + str;
            }
            bits[i] += str;
        }
    }

    locateGroups();

    console.log(group);
}

function locateGroups()
{
    for (var row=0; row < 128; row++)
    {
        for (var column=0; column < 128; column++)
        {
            if (bits[row][column] == '#')
            {
                group += 1;
                processGroup(row, column);
            }
        }    
    }
}

function processGroup(startX : number, startY : number)
{
    var queue = [{x:startX, y:startY}];
    while (queue.length > 0)
    {
        var element = queue.shift();

        
        if (element && element.x >= 0 && element.x < 128 && element.y >= 0 && element.y < 128)
        {
            // mark element as processed
            bits[element.x] = bits[element.x].substr(0, element.y) + "X" + bits[element.x].substr(element.y + 1);
            if (element.x - 1 >= 0 && bits[element.x - 1][element.y] == '#') {
                queue.push({ x: element.x - 1, y: element.y });
            }
            if (element.x + 1 < 128 && bits[element.x + 1][element.y] == '#') {
                queue.push({ x: element.x + 1, y: element.y });
            }
            if (element.y -1 >= 0 && bits[element.x][element.y - 1] == '#') {
                queue.push({ x: element.x, y: element.y - 1 });
            }
            if (element.y + 1 < 128 && bits[element.x][element.y + 1] == '#') {
                queue.push({ x: element.x, y: element.y + 1 });
            }
            
        }

        
    }
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