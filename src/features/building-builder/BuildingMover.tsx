import { useRef, useState } from "react";
import { TransformControls } from "@react-three/drei";
import { Mesh } from "three";
import {
  BuildingData,
  calculateSizeAndPosition,
  calculateCorners,
} from "../../types";
import BuildingMesh from "./BuildingMesh";

interface BuildingMoverProps {
  building: BuildingData;
  onMoveEnd: (updates: Partial<BuildingData>) => void;
}

function BuildingMover({ building, onMoveEnd }: BuildingMoverProps) {
  const meshRef = useRef<Mesh>(null);
  const [isRendered, setIsRendered] = useState(false);
  const { size, position } = calculateSizeAndPosition(
    building.minCorner,
    building.maxCorner
  );

  const handleMouseUp = () => {
    if (meshRef.current) {
      const newPosition = meshRef.current.position.clone();
      const { minCorner, maxCorner } = calculateCorners(newPosition, size);
      onMoveEnd({ minCorner, maxCorner });
    }
  };

  return (
    <group>
      <BuildingMesh
        ref={meshRef}
        size={size}
        position={position}
        numberOfFloors={building.numberOfFloors}
        floorHeight={building.floorHeight}
        isSelected={true}
        isTransparent={true}
        onAfterRender={() => setIsRendered(true)}
      />

      {meshRef.current && isRendered ? (
        <TransformControls
          object={meshRef.current}
          mode="translate"
          onMouseUp={handleMouseUp}
        />
      ) : null}
    </group>
  );
}

export default BuildingMover;
