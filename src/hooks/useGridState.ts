import { useState, useCallback } from 'react';
import type { GridState } from '@/components/astrological-grid/types';

export function useGridState() {
  const [gridState, setGridState] = useState<GridState>({});

  const getLetter = useCallback((areaId: number): string[] => {
    return gridState[areaId] || [];
  }, [gridState]);

  const initializeGrid = useCallback((initialState: GridState) => {
    setGridState(initialState);
  }, []);

  const updateGridSelectively = useCallback((newGridState: GridState) => {
    setGridState(prevState => {
      const updatedState: GridState = { ...prevState };
      let hasChanges = false;

      // Only update areas where planets actually changed
      for (const areaId in newGridState) {
        const prevPlanets = prevState[areaId] || [];
        const newPlanets = newGridState[areaId] || [];

        // Compare planet arrays (order and content matter)
        const planetsChanged =
          prevPlanets.length !== newPlanets.length ||
          !prevPlanets.every((planet, idx) => planet === newPlanets[idx]);

        if (planetsChanged) {
          updatedState[areaId] = newPlanets;
          hasChanges = true;
        }
      }

      // Handle areas that had planets but now don't
      for (const areaId in prevState) {
        if (!newGridState[areaId] && prevState[areaId].length > 0) {
          updatedState[areaId] = [];
          hasChanges = true;
        }
      }

      return hasChanges ? updatedState : prevState;
    });
  }, []);

  return { gridState, getLetter, initializeGrid, updateGridSelectively };
}
