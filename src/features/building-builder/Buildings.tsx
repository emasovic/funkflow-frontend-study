import { Select } from "@react-three/drei";
import { BuildingData } from "../../types";
import Building from "./Building";
import BuildingPopup from "./BuildingPopup";
import { Object3D } from "three";
import BuildingMover from "./BuildingMover";

interface BuildingsProps {
  buildings: Record<string, BuildingData>;
  editableBuilding: BuildingData | null;
  onRemoveBuilding: (id: string) => void;
  onSelectBuilding: (building: BuildingData | null) => void;
  onUpdateBuilding: (updates: Partial<BuildingData>) => void;
}

const Buildings = ({
  buildings,
  editableBuilding,
  onRemoveBuilding,
  onSelectBuilding,
  onUpdateBuilding,
}: BuildingsProps) => {
  const handlePointerUp = (selectedBuildings: Object3D[]) => {
    const building = selectedBuildings[0]
      ? buildings[selectedBuildings[0].userData.id]
      : null;

    onSelectBuilding(building);
  };
  return (
    <>
      <Select multiple={false} onChangePointerUp={handlePointerUp}>
        {Object.values(buildings).map((building) => (
          <Building
            key={building.id}
            {...building}
            isSelected={building.id === editableBuilding?.id}
          />
        ))}
      </Select>
      {editableBuilding && (
        <>
          <BuildingMover
            building={editableBuilding}
            onMoveEnd={({ minCorner, maxCorner }) =>
              onUpdateBuilding({ minCorner, maxCorner })
            }
          />
          <BuildingPopup
            minCorner={editableBuilding.minCorner}
            maxCorner={editableBuilding.maxCorner}
            id={editableBuilding.id}
            floorHeight={editableBuilding.floorHeight}
            numberOfFloors={editableBuilding.numberOfFloors}
            onChange={onUpdateBuilding}
            onDelete={onRemoveBuilding}
          />
        </>
      )}
    </>
  );
};

export default Buildings;
