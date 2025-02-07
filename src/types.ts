import { Vector3 } from "three";

export interface BuildingData {
    id: string;
    minCorner: Vector3;
    maxCorner: Vector3;
    floorHeight: number;
    numberOfFloors: number;
}

export function calculateSizeAndPosition(minCorner: Vector3, maxCorner: Vector3): {
    size: Vector3;
    position: Vector3;
} {
    const size = new Vector3().subVectors(maxCorner, minCorner);
    const position = new Vector3().addVectors(minCorner, maxCorner).multiplyScalar(0.5);
    return { size, position };
}

export function calculateCorners(position: Vector3, size: Vector3): {
    minCorner: Vector3;
    maxCorner: Vector3;
} {
    const halfSize = size.clone().multiplyScalar(0.5);
    const minCorner = new Vector3().subVectors(position, halfSize);
    const maxCorner = new Vector3().addVectors(position, halfSize);
    return { minCorner, maxCorner };
} 