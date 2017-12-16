import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    const instructionSet: Instruction[] = input
        .split(',')
        .map((code: string) => {
            let [
                match,
                switchInstr,
                switchArg,
                exchangeInstr,
                exchangeArg1,
                exchangeArg2,
                partnerInstr,
                partnerArgA,
                partnerArgB
            ] = /^(s(\d+))|(x(\d+)\/(\d+))|(p([a-p])\/([a-p]))/.exec(code)!;

            if (switchInstr) {
                return (circle: string[]) => {
                    let distance = parseInt(switchArg)
                    circle.splice(0, 0, ...circle.splice(circle.length - distance, distance));
                }
            } else if (exchangeInstr) {
                return (circle: string[]) => {
                    let index1 = parseInt(exchangeArg1);
                    let index2 = parseInt(exchangeArg2);
                    let temp = circle[index1];
                    circle[index1] = circle[index2];
                    circle[index2] = temp;
                }
            } else {
                return (circle: string[]) => {
                    let index1 = circle.indexOf(partnerArgA);
                    let index2 = circle.indexOf(partnerArgB);
                    let temp = circle[index1];
                    circle[index1] = circle[index2];
                    circle[index2] = temp;
                }
            }
        });

    let circle = 'abcdefghijklmnop'.split('');

    executeDance(instructionSet, circle);

    console.log(`Part 1: ${circle.join('')}`);

    let seenStates: { [state: string]: number } = {
        'abcdefghijklmnop': 0,
        [circle.join('')]: 1,
    };

    for (let i = 2; i <= 1000000000; i++) {
        executeDance(instructionSet, circle);

        let state = circle.join('');
        if (seenStates[state] !== undefined) {
            let period = i - seenStates[state];
            i = 1000000000 -((1000000000 - seenStates[state]) % period);
        } else {
            seenStates[state] = i;
        }
    }

    console.log(`Part 2: ${circle.join('')}`);
    
}

type Instruction =  (circle: string[]) => void;

findSolution();

function executeDance(instructionSet: ((circle: string[]) => void)[], circle: string[]) {
    instructionSet.forEach(instruction => instruction(circle));
}
