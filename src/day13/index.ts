import * as fs from 'mz/fs';

const inputRegex = /(\d+): (\d+)/;

interface Firewall {
    depth: number;
    range: number;
    period: number;
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
        if (isPacketCaughtByFirewall(firewalls[i], delay)) {
            return true;
        }
    }

    return false;
}

function parseInputIntoFirewalls(input: string) {
    return input
        .split('\n')
        .map(line => {
            let [match, depthStr, rangeStr] = inputRegex.exec(line)!;
            let depth = parseInt(depthStr);
            let range = parseInt(rangeStr)
            return {
                depth,
                range,
                period: 2 * (range - 1)
            };
        })
        .sort((a, b) => a.period - b.period); // Optimization for part 2
}

function isPacketCaughtByFirewall(firewall: Firewall, delay: number = 0): boolean {
    let { depth, period } = firewall;

    return (depth + delay) % period === 0;
}

findSolution();