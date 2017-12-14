import * as fs from 'mz/fs';

const inputRegex = /(\d+): (\d+)/;

interface Firewall {
    depth: number;
    range: number;
}

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let firewalls: Firewall[] = parseInputIntoFirewalls(input);

    solvePart1(firewalls);
    solvePart2(firewalls);
}

function solvePart1(firewalls: Firewall[]) {
    let totalSeverity = 0;
    firewalls.forEach(firewall => {
        if (isPacketCaughtByFirewall(firewall)) {
            let { depth, range } = firewall;
            totalSeverity += depth * range;
        }
    });
    console.log(`Part 1: ${totalSeverity}`);
}

function solvePart2(firewalls: Firewall[]) {
    let delay = 0;
    while (isPacketEverCaughtAfterDelay(firewalls, delay)) {
        delay++;
    }
    console.log(`Part 2: ${delay}`);
}

function isPacketEverCaughtAfterDelay(firewalls: Firewall[], delay: number): boolean {
    for (let i = 0; i < firewalls.length; i++) {
        if (isPacketCaughtByFirewall(firewalls[i])) {
            return true;
        }
    }

    return false;
}

function parseInputIntoFirewalls(input: string) {
    return input
        .split('\n')
        .map(line => {
            let [match, depth, range] = inputRegex.exec(line)!;
            return {
                depth: parseInt(depth),
                range: parseInt(range),
            };
        });
}

function isPacketCaughtByFirewall(firewall: Firewall, delay: number = 0): boolean {
    let { depth, range } = firewall;

    let period = Math.max(2 * (range - 1), 1);

    return (depth + delay) % period === 0;
}

findSolution();