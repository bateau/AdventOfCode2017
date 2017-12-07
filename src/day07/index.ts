import * as fs from 'mz/fs';

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let rootNode: TowerTreeNode = buildTree(input);

    console.log(`Part 1: ${rootNode.id}`);
}

interface TowerTreeNode {
    id: string;
    weight: number;
    childrenIds: string[];
    childNodes: TowerTreeNode[];
    childWeights: {[nodeId: string]: number}
}

function calculateTotalWeights(node: TowerTreeNode): number {
    let totalWeight = node.weight;
    node.childNodes.forEach(child => {
        let weight = calculateTotalWeights(child);
        node.childWeights[child.id] = weight;
        totalWeight += weight;
    });

    return totalWeight;
}

function extractRootNode(treeNodes: TowerTreeNode[]): TowerTreeNode {
    let allChildIds: string[] = [];
    let rootNode: TowerTreeNode;
    treeNodes.forEach(node => allChildIds = allChildIds.concat(node.childrenIds));
    treeNodes.forEach(node => {
        if (allChildIds.indexOf(node.id) === -1) {
            rootNode = node;
        }
    });

    return rootNode!;
}

function buildTree(input: string): TowerTreeNode {
    let treeNodeMap: {[id: string]: TowerTreeNode} = {};
    let treeNodes: TowerTreeNode[] = input
        .split('\n')
        .map(line => {
            let matches = /(\w+) \((\d+)\)( -> (((\w+(, )?))+))?/.exec(line);
            let node: TowerTreeNode = {
                id: matches![1],
                weight: parseInt(matches![2]),
                childrenIds: matches![4] ? matches![4].split(', ') : [],
                childNodes: [],
                childWeights: {},
            };
            treeNodeMap[node.id] = node;
            return node;
        });

    treeNodes.forEach(node => {
        node.childrenIds.forEach(childId => node.childNodes.push(treeNodeMap[childId]));
    });

    let rootNode: TowerTreeNode = extractRootNode(treeNodes);

    calculateTotalWeights(rootNode);

    return rootNode;
}

findSolution();
