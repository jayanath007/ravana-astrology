import { useState, useCallback } from 'react';
import type { GridState } from '@/components/astrological-grid/types';

export function useGridState() {
  const [gridState, setGridState] = useState<GridState>({});

  const setLetter = useCallback((areaId: number, letter: string | null) => {
    setGridState(prev => ({
      ...prev,
      [areaId]: letter
    }));
  }, []);

  const getLetter = useCallback((areaId: number): string | null => {
    return gridState[areaId] || null;
  }, [gridState]);

  const clearAll = useCallback(() => {
    setGridState({});
  }, []);

  return { gridState, setLetter, getLetter, clearAll };
}
