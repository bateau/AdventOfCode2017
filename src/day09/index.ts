import * as fs from 'mz/fs';

const enum Tokens {
    GroupBegin,
    GroupEnd,
    TrashBegin,
    TrashEnd,
}

interface Stream {
    data: string;
    index: number;
}

interface TokenParsingResult {
    meaningfulToken: Tokens;
    otherCharacters: number;
}

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let result = getGroupScore({ data: input, index: 0 }, 0);
    console.log(`Part 1: ${result.score}`);
    console.log(`Part 2: ${result.trash}`);
}

function getGroupScore(stream: Stream, nestLevel: number) {
    let score = nestLevel;
    let trash = 0;

    while (stream.index < stream.data.length) {
        let {meaningfulToken} = parseNextMeaningfulToken(stream);
        switch (meaningfulToken) {
            case Tokens.GroupBegin:
                let subGroupResult = getGroupScore(stream, nestLevel + 1);
                score += subGroupResult.score;
                trash += subGroupResult.trash;
                continue;
            case Tokens.GroupEnd:
                return  { score, trash };
            case Tokens.TrashBegin:
                trash += discardTrash(stream);
                continue;
            default:
                continue;
        }
    }

    return { score, trash };
}

function discardTrash(stream: Stream): number {
    let trashCount = 0;
    while (stream.index < stream.data.length) {
        let {meaningfulToken, otherCharacters} = parseNextMeaningfulToken(stream);
        trashCount += otherCharacters;
        switch (meaningfulToken) {
            case Tokens.TrashEnd:
                return trashCount;
            default:
                trashCount++;
                continue;
        }
    }
    throw new Error('End of stream');
}

function parseNextMeaningfulToken(stream: Stream): TokenParsingResult {
    let count = 0;
    while (stream.index < stream.data.length) {
        switch (stream.data[stream.index++]) {
            case '<':
                return {
                    meaningfulToken: Tokens.TrashBegin,
                    otherCharacters: count
                };
            case '>':
                return {
                    meaningfulToken: Tokens.TrashEnd,
                    otherCharacters: count
                };
            case '{':
                return {
                    meaningfulToken: Tokens.GroupBegin,
                    otherCharacters: count
                };
            case '}':
                return {
                    meaningfulToken: Tokens.GroupEnd,
                    otherCharacters: count
                };
            case '!':
                stream.index++;
                continue;
            default:
                count++;
                continue;
        }
    }
    throw new Error('End of stream');
}

findSolution();