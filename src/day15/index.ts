import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    var prevA = 516;
    var prevB = 190;
    var total = 0;

    for (var i=0; i< 40000000; i++)
    {
        prevA = prevA * 16807 % 2147483647;
        prevB = prevB * 48271 % 2147483647;
        if ((prevA & 0xFFFF) == (prevB & 0xFFFF))
        {
            total += 1;
        }
    }

    console.log(total);
}

async function findSolution2(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    var prevA = 516;
    var prevB = 190;
    var total = 0;
    var valuesA = [];
    var valuesB = [];
    const judgeLimit = 5000000;

    while (valuesA.length < judgeLimit || valuesB.length < judgeLimit)
    {
        prevA = prevA * 16807 % 2147483647;
        if (prevA % 4 == 0 && valuesA.length < judgeLimit)
        {
            valuesA.push(prevA);
        }

        prevB = prevB * 48271 % 2147483647;
        if (prevB % 8 == 0 && valuesB.length < judgeLimit)
        {
            valuesB.push(prevB);
        }
    }

    for (var i = 0; i<judgeLimit; i++)
    {
        if ((valuesA[i] & 0xFFFF) == (valuesB[i] & 0xFFFF))
            {
                total += 1;
            }
    }

    console.log(total);
}

findSolution();
findSolution2()