import * as fs from 'mz/fs';

const instructionRegex = /(\w+) (inc|dec) (-?\d+) if (\w+) (>|<|>=|<=|!=|==) (-?\d+)/;

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let program: Program = buildProgram(input);

    let maxValueEver = executeProgram(program);

    console.log(`Part 1: ${findMaxValueInRegisters(program)}`);
    console.log(`Part 2: ${maxValueEver}`);
}

interface Instruction {
    registerToModify: string;
    modification: number;
    registerToTest: string;
    test: (value: number) => boolean;
}

interface RegisterSet {
    [addr: string]: number;
}

interface Program {
    instructions: Instruction[];
    registers: RegisterSet;
}

findSolution();

function findMaxValueInRegisters(program: Program) {
    return Object.keys(program.registers)
        .reduce((max, addr) => Math.max(max, program.registers[addr]), Number.MIN_SAFE_INTEGER);
}

function executeProgram({ instructions, registers }: Program) {
    let maxValueEver = 0;

    instructions.forEach(instr => {
        if (instr.test(registers[instr.registerToTest])) {
            registers[instr.registerToModify] += instr.modification;
            maxValueEver = Math.max(maxValueEver, registers[instr.registerToModify]);
        }
    });
    return maxValueEver;
}

function buildProgram(input: string) {
    let instructions: Instruction[] = input
        .split('\n')
        .map(line => {
            let matches = instructionRegex.exec(line);
            if (!matches) {
                throw new Error(line);
            }
            return {
                registerToModify: matches[1],
                modification: (matches[2] === 'dec' ? -1 : 1) * parseInt(matches[3]),
                registerToTest: matches[4],
                test: (value: number) => {
                    let comparitor: number = parseInt(matches![6]);
                    switch (matches![5]) {
                        case '>':
                            return value > comparitor;
                        case '<':
                            return value < comparitor;
                        case '>=':
                            return value >= comparitor;
                        case '<=':
                            return value <= comparitor;
                        case '!=':
                            return value !== comparitor;
                        case '==':
                            return value === comparitor;
                        default:
                            throw new Error('WTF?');
                    }
                }
            };
        });

    let registers: RegisterSet = {};

    instructions.forEach(instr => {
        registers[instr.registerToModify] = 0;
        registers[instr.registerToTest] = 0;
    });

    return { instructions, registers };
}
