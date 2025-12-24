import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGridState } from '@/hooks/useGridState';
import { GRID_CONFIG } from './grid-config';
import { GridArea } from './GridArea';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';
import { calculateGrahaDrishti, grahaDrishtiMapToObject } from '@/utils/graha-drishti';

export function AstrologicalGrid() {
  const location = useLocation();
  const navigate = useNavigate();
  const zodiacNumber = location.state?.zodiacNumber as number | undefined;
  const planetSigns = location.state?.planetSigns as PlanetSign[] | undefined;

  const { getLetter, initializeGrid } = useGridState();
  const [offsetValue] = useState(zodiacNumber || 1);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);

  // Calculate Graha Drishti from planet signs
  const grahaDrishtiData = useMemo(() => {
    if (!planetSigns || planetSigns.length === 0) {
      return null;
    }

    const drishtiMap = calculateGrahaDrishti(planetSigns);
    return grahaDrishtiMapToObject(drishtiMap);
  }, [planetSigns]);

  // Get planets that aspect the selected area
  const aspectingPlanets = useMemo(() => {
    if (!selectedAreaId || !grahaDrishtiData) {
      return [];
    }
    return grahaDrishtiData[selectedAreaId] || [];
  }, [selectedAreaId, grahaDrishtiData]);

  const handleAreaSelect = (areaId: number) => {
    // Toggle selection: if clicking the same area, deselect it
    setSelectedAreaId(prevId => prevId === areaId ? null : areaId);
  };

  // Map planets to their corresponding areas when component mounts or when planetSigns/offsetValue changes
  useEffect(() => {
    if (planetSigns && planetSigns.length > 0) {
      // Build the grid state from planet signs
      const newGridState: { [key: number]: string[] } = {};

      planetSigns.forEach(({ planet, sign }) => {
        // Calculate which area ID corresponds to this sign based on the offset
        // Formula: areaId = (sign - offsetValue + 1) % 12
        // If result is 0 or negative, adjust it
        let areaId = (sign - offsetValue + 1);
        while (areaId <= 0) {
          areaId += 12;
        }
        while (areaId > 12) {
          areaId -= 12;
        }

        // Add the planet to this area
        if (!newGridState[areaId]) {
          newGridState[areaId] = [];
        }
        newGridState[areaId].push(planet);
      });

      // Initialize the grid with all planets at once
      initializeGrid(newGridState);
    }
  }, [planetSigns, offsetValue, initializeGrid]);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className={`px-4 py-2 font-medium rounded-md transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
        >
          ← Back to Input
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        {/* Grid */}
        <div className="w-full max-w-2xl">
          <svg
            viewBox="0 0 300 300"
            className={`w-full h-full border-2 ${TAILWIND_CLASSES.ui.gridBorder}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {GRID_CONFIG.map((config) => (
              <GridArea
                key={config.id}
                config={config}
                letter={getLetter(config.id)}
                offsetValue={offsetValue}
                planetSigns={planetSigns}
                isSelected={selectedAreaId === config.id}
                onSelect={handleAreaSelect}
                aspectingPlanets={aspectingPlanets}
              />
            ))}
          </svg>
        </div>

      </div>
    </div>
  );
}
