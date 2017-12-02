import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    const grid: number[][] = input
        .split('\n')
        .map(line =>
            line
                .split('\t')
                .map(cell =>
                    parseInt(cell)));

    let checksum = 0;
    grid.forEach(line => {
        let sortedLine = [...line].sort((a, b) => a - b);
        checksum += sortedLine[sortedLine.length - 1] - sortedLine[0]
    });

    console.log(`Part 1: ${checksum}`);

    checksum = 0;
    grid.forEach(line => {
        line.forEach(divisor => {
            line.forEach(dividee => {
                if (divisor !== dividee
                    && Number.isInteger(dividee / divisor)) {
                        checksum += dividee / divisor
                    }
            });
        });
    });

    console.log(`Part 2: ${checksum}`);
}

findSolution();