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

  return { gridState, getLetter, initializeGrid };
}
