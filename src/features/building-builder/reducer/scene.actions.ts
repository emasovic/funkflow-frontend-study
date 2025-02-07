import { BuildingData } from "../../../types";
import { FlowState } from "./scene.state";

export enum SceneActionType {
    SET_FLOW_STATE = 'SET_FLOW_STATE',
    SET_EDITABLE_BUILDING = 'SET_EDITABLE_BUILDING',
    ADD_BUILDING = 'ADD_BUILDING',
    UPDATE_BUILDING = 'UPDATE_BUILDING',
    REMOVE_BUILDING = 'REMOVE_BUILDING',
}

export type SceneAction =
    | { type: SceneActionType.SET_FLOW_STATE; payload: FlowState }
    | { type: SceneActionType.SET_EDITABLE_BUILDING; payload: BuildingData | null }
    | { type: SceneActionType.ADD_BUILDING; payload: BuildingData }
    | { type: SceneActionType.UPDATE_BUILDING; payload: BuildingData }
    | { type: SceneActionType.REMOVE_BUILDING; payload: string }; 