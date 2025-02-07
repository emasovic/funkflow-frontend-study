import { forwardRef } from "react";
import { Box, Edges, ShapeProps } from "@react-three/drei";
import { BoxGeometry, Mesh } from "three";
import { Vector3 } from "three";
import { useMantineTheme } from "@mantine/core";

interface BuildingMeshProps extends ShapeProps<typeof BoxGeometry> {
  size: Vector3;
  position: Vector3;
  numberOfFloors: number;
  floorHeight: number;
  isSelected?: boolean;
  isTransparent?: boolean;
}

const BuildingMesh = forwardRef<Mesh, BuildingMeshProps>(
  (
    {
      size,
      position,
      numberOfFloors,
      floorHeight,
      isSelected,
      isTransparent,
      ...boxProps
    },
    ref
  ) => {
    const theme = useMantineTheme();

    return (
      <Box
        ref={ref}
        args={[size.x, size.y, size.z]}
        position={position}
        {...boxProps}
      >
        <meshBasicMaterial
          color={theme.colors.building[2]}
          transparent={isTransparent}
          opacity={isTransparent ? 0.5 : 1}
          fog={false}
          toneMapped={false}
        />
        <Edges
          color={
            isSelected ? theme.colors.building[4] : theme.colors.building[3]
          }
        />

        {Array.from({ length: numberOfFloors - 1 }).map((_, index) => (
          <Edges
            key={`floor-${index}`}
            color={theme.colors.building[3]}
            scale={[1, 0.001, 1]}
            position={[0, -size.y / 2 + (index + 1) * floorHeight, 0]}
          />
        ))}
      </Box>
    );
  }
);

BuildingMesh.displayName = "BuildingMesh";
export default BuildingMesh;
