import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let [startA, startB] = input
        .split('\n')
        .map((line: string) => parseInt(/(\d+)/.exec(line)![0]));

    let genA = new Generator(16807, startA, 4);
    let genB = new Generator(48271, startB, 8);

    console.log(`Part 1: ${solvePart1(genA, genB)}`);
    console.log(`Part 2: ${solvePart2(genA, genB)}`);
}

function solvePart1(genA: Generator, genB: Generator) {
    genA.reset();
    genB.reset();
    
    let judgeCount = 0;
    for (let i = 0; i < 40000000; i++) {
        if (judge(genA.generate(), genB.generate())) {
            judgeCount++;
        }
    }
    return judgeCount;
}

function solvePart2(genA: Generator, genB: Generator) {
    genA.reset();
    genB.reset();

    let judgeCount = 0;
    for (let i = 0; i < 5000000; i++) {
        if (judge(genA.generateAcceptableNumber(), genB.generateAcceptableNumber())) {
            judgeCount++;
        }
    }
    return judgeCount;
}

function judge(a: number, b: number): boolean {
    const mask = 65535;

    return (a & mask) === (b & mask);
}

const divisor = 2147483647;

class Generator {
    private previous: number;

    constructor(private factor: number, private seed: number, private acceptableMultiple: number) {
        this.previous = this.seed;
    }

    generate(): number {
        this.previous = (this.previous * this.factor) % divisor;

        return this.previous;
    }

    generateAcceptableNumber(): number {
        while (this.generate() % this.acceptableMultiple !== 0) {}

        return this.previous;
    }

    reset() {
        this.previous = this.seed;
    }
}

findSolution();