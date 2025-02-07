import { memo, useRef } from "react";
import { Mesh } from "three";
import { BuildingData, calculateSizeAndPosition } from "../../types";
import BuildingMesh from "./BuildingMesh";

interface BuildingProps extends BuildingData {
  isSelected?: boolean;
}

function Building({
  minCorner,
  maxCorner,
  isSelected,
  id,
  numberOfFloors,
  floorHeight,
}: BuildingProps) {
  const meshRef = useRef<Mesh>(null);
  const { size, position } = calculateSizeAndPosition(minCorner, maxCorner);

  return (
    <BuildingMesh
      ref={meshRef}
      size={size}
      position={position}
      numberOfFloors={numberOfFloors}
      floorHeight={floorHeight}
      isSelected={isSelected}
      userData={{ id }}
    />
  );
}

export default memo(Building);
