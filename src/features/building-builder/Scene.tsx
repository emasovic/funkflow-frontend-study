import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  GizmoHelper,
  GizmoViewport,
  Grid,
} from "@react-three/drei";
import { Box, Button, Flex, useMantineTheme } from "@mantine/core";
import { BuildingData } from "../../types";
import { sceneReducer } from "./reducer/scene.reducer";
import { initialState } from "./reducer/scene.state";
import { useReducer } from "react";
import { Vector3 } from "three";
import { IconPlus } from "@tabler/icons-react";
import { SceneActionType } from "./reducer/scene.actions";
import Buildings from "./Buildings";

const Scene = () => {
  const [{ buildings, editableBuilding }, dispatch] = useReducer(
    sceneReducer,
    initialState
  );
  const theme = useMantineTheme();

  const handleAddBuilding = () => {
    const newBuilding = {
      id: (Object.keys(buildings).length + 1).toString(),
      minCorner: new Vector3(-1.5, 0, -1.5),
      maxCorner: new Vector3(1.5, 3, 1.5),
      numberOfFloors: 3,
      floorHeight: 1,
    };

    dispatch({ type: SceneActionType.ADD_BUILDING, payload: newBuilding });
  };

  const handleUpdateBuilding = (updates: Partial<BuildingData>) => {
    if (!editableBuilding) return;

    dispatch({
      type: SceneActionType.UPDATE_BUILDING,
      payload: { ...editableBuilding, ...updates },
    });
  };

  const handleRemoveBuilding = (id: string) => {
    dispatch({ type: SceneActionType.REMOVE_BUILDING, payload: id });
  };

  const handleSelectBuilding = (selectedBuilding: BuildingData | null) => {
    dispatch({
      type: SceneActionType.SET_EDITABLE_BUILDING,
      payload: selectedBuilding,
    });
  };

  const joinedBuildings = editableBuilding
    ? {
        ...buildings,
        [editableBuilding.id]: editableBuilding,
      }
    : buildings;

  return (
    <Box pos="relative" w="100%" h="100%">
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <color attach="background" args={[theme.colors.scene[0]]} />
        <group>
          <Grid
            infiniteGrid
            sectionColor={theme.colors.scene[1]}
            cellColor={theme.colors.scene[1]}
          />

          <Buildings
            buildings={joinedBuildings}
            editableBuilding={editableBuilding}
            onRemoveBuilding={handleRemoveBuilding}
            onSelectBuilding={handleSelectBuilding}
            onUpdateBuilding={handleUpdateBuilding}
          />
        </group>

        <CameraControls makeDefault />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={[
              theme.colors.scene[2],
              theme.colors.scene[3],
              theme.colors.scene[4],
            ]}
          />
        </GizmoHelper>
      </Canvas>
      <Flex pos="absolute" bottom={20} w="100%" justify="center">
        <Button onClick={handleAddBuilding} leftSection={<IconPlus />}>
          Building
        </Button>
      </Flex>
    </Box>
  );
};

export default Scene;
