import * as fs from 'mz/fs';

interface HexCoordinate {
    x: number;
    y: number;
    z: number;
}

async function findSolution(inputFilePath: string = './input.txt') {
    const input = await fs.readFile(require.resolve(inputFilePath), 'utf8');

    let directions: string[] = input.split(',');

    // Thanks to https://www.redblobgames.com/grids/hexagons/#coordinates-cube for the guidance on this algorithm
    const directionToCoordinate: { [direction: string]: (coord: HexCoordinate) => HexCoordinate } = {
        n: (coord: HexCoordinate) => ({x: coord.x, y: coord.y + 1, z: coord.z - 1}),
        s: (coord: HexCoordinate) => ({x: coord.x, y: coord.y - 1, z: coord.z + 1}),
        ne: (coord: HexCoordinate) => ({x: coord.x + 1, y: coord.y, z: coord.z - 1}),
        sw: (coord: HexCoordinate) => ({x: coord.x - 1, y: coord.y, z: coord.z + 1}),
        nw: (coord: HexCoordinate) => ({x: coord.x - 1, y: coord.y + 1, z: coord.z}),
        se: (coord: HexCoordinate) => ({x: coord.x + 1, y: coord.y - 1, z: coord.z}),
    };

    let maxDistance = 0;
    let currentPosition = { x: 0, y: 0, z: 0};

    directions.forEach(dir => {
        currentPosition = directionToCoordinate[dir](currentPosition);
        maxDistance = Math.max(maxDistance, distanceFromOrigin(currentPosition));
    });

    console.log(`Part 1: ${distanceFromOrigin(currentPosition)}`);
    console.log(`Part 2: ${maxDistance}`);
}

function distanceFromOrigin(coord: HexCoordinate): number {
    return Math.max(
        Math.abs(coord.x),
        Math.abs(coord.y),
        Math.abs(coord.z),
    )
}

findSolution();