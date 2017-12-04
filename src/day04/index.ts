import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    const phrases = input.split('\n');

    console.log(`Part 1: ${solvePart1(phrases)}`);
    console.log(`Part 2: ${solvePart2(phrases)}`);
}

findSolution();


function solvePart1(phrases: string[]): number {
    return findNumberOfDuplicateWords(phrases);
}

function solvePart2(phrases: string[]): number {
    return findNumberOfDuplicateWords(phrases
        .map(phrase =>
            phrase
                .split(' ')
                .map(word =>
                    word
                        .split('')
                        .sort()
                        .join(''))
                .sort()
                .join(' ')));
}

function findNumberOfDuplicateWords(phrases: string[]): number {
    return phrases.reduce((acc: number, phrase: string) => {
        if ((/(\b\w+\b).*\b\1\b/).test(phrase)) {
            return acc;
        }
        return acc + 1;
    }, 0);
}
