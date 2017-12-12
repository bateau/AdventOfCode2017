import * as fs from 'mz/fs';

const inputLineRegex = /(\d+) <-> (\d+(, \d+)*)/;

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let graph: number[][] = buildGraph(input);
    let connectedGraphs = findConnectedGraphs(graph);

    console.log(`Part 1: ${connectedGraphs[0].length}`);
    console.log(`Part 1: ${connectedGraphs.length}`);
}

findSolution();

function findConnectedGraphs(graph: number[][]): number[][] {
    let connectedGraphs: number[][] = [];
    let nodeTracker: boolean[] = []
    let queue: number[] = [0];
    let groupNumber = 0;

    for (let i = 0; i < graph.length; i++) {
        if (nodeTracker[i]) {
            continue;
        }

        connectedGraphs[groupNumber] = [];
        queue = [i];
        while (queue.length) {
            let nodeId = queue.shift()!;
            if (!nodeTracker[nodeId]) {
                connectedGraphs[groupNumber].push(nodeId);
                nodeTracker[nodeId] = true;
                queue = queue.concat(graph[nodeId]);
            }
        }
        groupNumber++;
    }

    return connectedGraphs;
}

function buildGraph(input: string) {
    let nodes: number[][] = [];
    input
        .split('\n')
        .forEach(line => {
            let [match, nodeId, connectedNodes] = inputLineRegex.exec(line)!;
            nodes[parseInt(nodeId)] = connectedNodes
                .split(', ')
                .map(id => parseInt(id));
        });
    return nodes;
}
