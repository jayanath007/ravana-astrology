import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGridState } from '@/hooks/useGridState';
import { GRID_CONFIG } from './grid-config';
import { GridArea } from './GridArea';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';
import { calculateGrahaDrishti, grahaDrishtiMapToObject } from '@/utils/graha-drishti';

// Mapping of zodiac sign numbers (1-12) to their ruling planets
const ZODIAC_LORDS: Record<number, string> = {
  1: 'කු',  // Aries (මේශ) → කුජ (Mars)
  2: 'ශු', // Taurus (වෘෂභ) → ශුක්‍ර (Venus)
  3: 'බු', // Gemini (මිථුන) → බුධ (Mercury)
  4: 'ච',  // Cancer (කර්ක) → චන්ද්‍ර (Moon)
  5: 'ර',  // Leo (සිංහ) → සූර්ය (Sun)
  6: 'බු', // Virgo (කන්‍යා) → බුධ (Mercury)
  7: 'ශු', // Libra (තුලා) → ශුක්‍ර (Venus)
  8: 'කු', // Scorpio (වෘශික) → මංගල (Mars)
  9: 'ගු', // Sagittarius (ධන) → ගුරු (Jupiter)
  10: 'ශ', // Capricorn (මකර) → ශනි (Saturn)
  11: 'ශ', // Aquarius (කුම්භ) → ශනි (Saturn)
  12: 'ගු' // Pisces (මීන) → ගුරු (Jupiter)
};

export function AstrologicalGrid() {
  const location = useLocation();
  const navigate = useNavigate();
  const zodiacNumber = location.state?.zodiacNumber as number | undefined;
  const planetSigns = location.state?.planetSigns as PlanetSign[] | undefined;

  const { getLetter, initializeGrid } = useGridState();
  const [offsetValue] = useState(zodiacNumber || 1);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [highlightedPlanet, setHighlightedPlanet] = useState<string | null>(null);

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
    const newSelectedAreaId = selectedAreaId === areaId ? null : areaId;
    setSelectedAreaId(newSelectedAreaId);

    // Calculate zodiac sign for this area to find ruling planet
    if (newSelectedAreaId !== null) {
      // Same calculation as in GridArea.tsx: ((offsetValue - 1) + areaId) % 12
      const signId = ((offsetValue - 1) + newSelectedAreaId) % 12;
      const finalSignId = signId === 0 ? 12 : signId;

      // Look up the ruling planet for this zodiac sign
      const rulingPlanet = ZODIAC_LORDS[finalSignId];
      setHighlightedPlanet(rulingPlanet);
    } else {
      // Deselect: clear the highlighted planet
      setHighlightedPlanet(null);
    }
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
                highlightedPlanet={highlightedPlanet}
              />
            ))}
          </svg>
        </div>

      </div>
    </div>
  );
}
