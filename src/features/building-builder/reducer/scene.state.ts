import { BuildingData } from "../../../types";

export type FlowState = 'view' | 'building_selection';

export interface SceneState {
    flowState: FlowState;
    buildings: Record<string, BuildingData>;
    editableBuilding: BuildingData | null;
}

export const initialState: SceneState = {
    flowState: 'view',
    buildings: {},
    editableBuilding: null,
}; 