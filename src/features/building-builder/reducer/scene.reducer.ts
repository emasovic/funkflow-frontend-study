import { SceneState } from './scene.state';
import { SceneAction, SceneActionType } from './scene.actions';

export function sceneReducer(state: SceneState, action: SceneAction): SceneState {
    switch (action.type) {
        case SceneActionType.SET_FLOW_STATE:
            return {
                ...state,
                flowState: action.payload,
            };

        case SceneActionType.SET_EDITABLE_BUILDING:
            return {
                ...state,
                editableBuilding: action.payload,
                flowState: action.payload ? 'building_selection' : 'view',
            };

        case SceneActionType.ADD_BUILDING:
            return {
                ...state,
                buildings: {
                    ...state.buildings,
                    [action.payload.id]: action.payload,
                },
            };

        case SceneActionType.UPDATE_BUILDING: {
            return {
                ...state,
                editableBuilding: action.payload,
                buildings: {
                    ...state.buildings,
                    [action.payload.id]: action.payload,
                },
            };
        }

        case SceneActionType.REMOVE_BUILDING: {
            const buildings = { ...state.buildings }
            delete buildings[action.payload]
            return {
                ...state,
                buildings,
                editableBuilding: null,
                flowState: 'view',
            };
        }

        default:
            return state;
    }
} 