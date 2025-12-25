/**
 * PlanetDisplay Component
 * Handles rendering of planets in grid areas with proper positioning and highlighting
 */

import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';
import { getPlanetColor } from '@/utils/planet-colors';
import { INTERACTION_COLORS, TAILWIND_CLASSES } from '@/styles/theme-colors';
import { getLayoutConfig, calculatePlanetPosition } from './planet-layout';

interface PlanetDisplayProps {
  planets: string[];
  centerX: number;
  centerY: number;
  planetSigns?: PlanetSign[];
  aspectingPlanets?: string[];
  highlightedPlanet?: string | null;
}

export function PlanetDisplay({
  planets,
  centerX,
  centerY,
  planetSigns,
  aspectingPlanets = [],
  highlightedPlanet = null,
}: PlanetDisplayProps) {
  if (planets.length === 0) return null;

  const layoutConfig = getLayoutConfig(planets.length);

  return (
    <>
      {planets.map((planet, index) => {
        // Find the original sign for this planet
        const planetData = planetSigns?.find((ps) => ps.planet === planet);
        const color = planetData
          ? getPlanetColor(planet, planetData.sign)
          : undefined;

        const isAspecting = aspectingPlanets.includes(planet);
        const isHighlighted = highlightedPlanet === planet;

        // Calculate position for this planet
        const position = calculatePlanetPosition(
          index,
          planets.length,
          layoutConfig,
          centerX,
          centerY,
          isHighlighted
        );

        return (
          <g key={`${planet}-${index}`}>
            {/* Highlight background square for aspecting planet (orange) */}
            {isAspecting && (
              <rect
                x={
                  position.x -
                  parseInt(INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE) / 2
                }
                y={
                  position.y -
                  parseInt(INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE) / 2
                }
                width={INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE}
                height={INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE}
                className={TAILWIND_CLASSES.aspectingHighlight}
                opacity={INTERACTION_COLORS.ASPECTING_HIGHLIGHT_OPACITY}
              />
            )}

            {/* Planet text */}
            <text
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="central"
              className={`pointer-events-none font-semibold select-none ${position.adjustedFontSize}`}
              style={{ fill: color }}
            >
              {planet}
            </text>
          </g>
        );
      })}
    </>
  );
}
