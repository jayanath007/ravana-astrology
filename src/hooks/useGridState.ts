import { useState, useCallback } from 'react';
import type { GridState } from '@/components/astrological-grid/types';

export function useGridState() {
  const [gridState, setGridState] = useState<GridState>({});

  const setLetter = useCallback((areaId: number, letter: string | null) => {
    setGridState(prev => {
      const currentLetters = prev[areaId] || [];

      if (letter === null) {
        // Clear all letters for this area
        const newState = { ...prev };
        delete newState[areaId];
        return newState;
      }

      // Toggle letter: add if not present, remove if present
      // Maximum 5 letters per area
      const letterIndex = currentLetters.indexOf(letter);
      const newLetters = letterIndex >= 0
        ? currentLetters.filter((_, i) => i !== letterIndex)
        : currentLetters.length < 9
        ? [...currentLetters, letter]
        : currentLetters;

      if (newLetters.length === 0) {
        const newState = { ...prev };
        delete newState[areaId];
        return newState;
      }

      return {
        ...prev,
        [areaId]: newLetters
      };
    });
  }, []);

  const getLetter = useCallback((areaId: number): string[] => {
    return gridState[areaId] || [];
  }, [gridState]);

  const clearAll = useCallback(() => {
    setGridState({});
  }, []);

  const initializeGrid = useCallback((initialState: GridState) => {
    setGridState(initialState);
  }, []);

  return { gridState, setLetter, getLetter, clearAll, initializeGrid };
}
