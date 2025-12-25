import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGridState } from '@/hooks/useGridState';
import { GRID_CONFIG } from './grid-config';
import { GridArea } from './GridArea';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';
import { calculateGrahaDrishti, grahaDrishtiMapToObject } from '@/utils/graha-drishti';
import { calculateZodiacSignId, calculateAreaIdFromSign } from '@/utils/zodiac-calculations';
import { getRulingPlanet } from '@/utils/zodiac-lords';

interface AstrologicalGridProps {
  zodiacNumber?: number;
  planetSigns?: PlanetSign[];
  showBackButton?: boolean;
  title?: string;
}

export function AstrologicalGrid({
  zodiacNumber: propZodiacNumber,
  planetSigns: propPlanetSigns,
  showBackButton = true,
  title
}: AstrologicalGridProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Use props if provided, otherwise fall back to location state
  const zodiacNumber = propZodiacNumber ?? location.state?.zodiacNumber as number | undefined;
  const planetSigns = propPlanetSigns ?? location.state?.planetSigns as PlanetSign[] | undefined;

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
      // Use shared utility for zodiac calculation
      const signId = calculateZodiacSignId(newSelectedAreaId, offsetValue);

      // Look up the ruling planet for this zodiac sign
      const rulingPlanet = getRulingPlanet(signId);
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
        // Use shared utility to calculate area ID from sign
        const areaId = calculateAreaIdFromSign(sign, offsetValue);

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
      {showBackButton && (
        <div className="mb-6">
        </div>
      )}

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
                title={config.isCenter ? title : undefined}
              />
            ))}
          </svg>
        </div>

      </div>
    </div>
  );
}
