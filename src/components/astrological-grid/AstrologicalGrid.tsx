import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGridState } from '@/hooks/useGridState';
import { GRID_CONFIG } from './grid-config';
import { GridArea } from './GridArea';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';

export function AstrologicalGrid() {
  const location = useLocation();
  const navigate = useNavigate();
  const zodiacNumber = location.state?.zodiacNumber as number | undefined;
  const planetSigns = location.state?.planetSigns as PlanetSign[] | undefined;

  const { getLetter, setLetter, initializeGrid } = useGridState();
  const [offsetValue] = useState(zodiacNumber || 1);

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
          className="px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white font-medium rounded-md transition-colors"
        >
          ← Back to Input
        </button>
      </div>

      <div className="flex items-center justify-center">
        {/* Grid */}
        <div className="w-full max-w-2xl">
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full border-2 border-neutral-300 dark:border-neutral-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            {GRID_CONFIG.map((config) => (
              <GridArea
                key={config.id}
                config={config}
                letter={getLetter(config.id)}
                onLetterSelect={setLetter}
                offsetValue={offsetValue}
                planetSigns={planetSigns}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
