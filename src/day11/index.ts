import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    const opposites: { [key: string]: string} = {
        n: 's',
        s: 'n',
        ne: 'sw',
        se: 'nw',
        nw: 'se',
        sw: 'ne',
    };

    const consolidation: { [key: string]: string} = {
        ne: 'nw',
        se: 'sw',
        nw: 'ne',
        sw: 'se',
    };

    let directions: string[] = input.split(',');

    for (let i = 0; i < directions.length; ) {
        let oppositeDirectionIndex = directions.indexOf(opposites[directions[i]]);
        if (oppositeDirectionIndex !== -1) {
            directions.splice(oppositeDirectionIndex, 1);
            directions.splice(i, 1);
        } else {
            i++;
        }
    }

    for (let i = 0; i < directions.length; ) {
        let consolidateIndex = directions.indexOf(consolidation[directions[i]]);
        if (consolidateIndex !== -1) {
            directions.splice(consolidateIndex, 1);
            directions.splice(i, 1, directions[i].substr(0, 1));
        } else {
            i++;
        }
    }

    console.log(JSON.stringify(directions));
    console.log(directions.length);
}
// 375 ne, 330 se, 72 s

findSolution();