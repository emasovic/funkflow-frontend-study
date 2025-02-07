# Building Builder - React + Three.js Project

An interactive 3D building editor built with React, TypeScript, Three.js, and Vite.

## Features

- Create and edit 3D buildings in real-time
- Adjust building dimensions, floors, and floor heights
- Drag and drop building placement
- Interactive 3D viewport with camera controls
- Visual selection and transformation tools

## Tech Stack

- React + TypeScript
- Three.js with @react-three/fiber
- @react-three/drei for 3D utilities
- Vite for build tooling

## Architecture

### Core Components

- `Scene.tsx`: Main container with 3D canvas setup and state management
- `Buildings.tsx`: Collection manager for building instances
- `Building.tsx`: Individual building component
- `BuildingMesh.tsx`: 3D mesh rendering
- `BuildingMover.tsx`: Transform controls
- `BuildingPopup.tsx`: Property editor UI

### State Management

Uses reducer pattern with:

- `scene.state.ts`: State structure
- `scene.actions.ts`: Action definitions
- `scene.reducer.ts`: State updates

## Getting Started

1. Install dependencies:

```bash
yarn
```

2. Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`.

## Usage

1. Click "Add Building" to create a new building
2. Select a building to edit its properties
3. Use transform controls to move buildings
4. Adjust camera view with mouse controls:
   - Left click + drag to rotate
   - Right click + drag to pan
   - Scroll to zoom
