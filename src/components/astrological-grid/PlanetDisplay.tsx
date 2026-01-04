/**
 * PlanetDisplay Component
 * Handles rendering of planets in grid areas with proper positioning and highlighting
 */

import { memo } from 'react';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';
import { getPlanetColor } from '@/utils/planet-colors';
import { INTERACTION_COLORS, TAILWIND_CLASSES } from '@/styles/theme-colors';
import { getLayoutConfig, calculatePlanetPosition } from './planet-layout';
import { PlanetTooltip } from './PlanetTooltip';

interface PlanetDisplayProps {
  planets: string[];
  centerX: number;
  centerY: number;
  planetSigns?: PlanetSign[];
  aspectingPlanets?: string[];
  highlightedPlanet?: string | null;
  enableTooltip?: boolean;
}

function PlanetDisplayComponent({
  planets,
  centerX,
  centerY,
  planetSigns,
  aspectingPlanets = [],
  highlightedPlanet = null,
  enableTooltip = false,
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
          <PlanetTooltip
            key={`${planet}-${index}`}
            planet={planet}
            x={position.x}
            y={position.y}
            enabled={enableTooltip}
            planetData={planetData}
          >
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
              className={`pointer-events-auto font-bold select-none ${position.adjustedFontSize}`}
              style={{ fill: color }}
            >
              {planet}
            </text>
          </PlanetTooltip>
        );
      })}
    </>
  );
}

/**
 * Custom comparison function for React.memo
 * Compares PlanetDisplay props to determine if re-render is needed
 */
function arePlanetDisplayPropsEqual(
  prevProps: PlanetDisplayProps,
  nextProps: PlanetDisplayProps
): boolean {
  // Compare planets array
  if (prevProps.planets.length !== nextProps.planets.length) {
    return false;
  }
  for (let i = 0; i < prevProps.planets.length; i++) {
    if (prevProps.planets[i] !== nextProps.planets[i]) {
      return false;
    }
  }

  // Compare primitives
  if (
    prevProps.centerX !== nextProps.centerX ||
    prevProps.centerY !== nextProps.centerY ||
    prevProps.highlightedPlanet !== nextProps.highlightedPlanet ||
    prevProps.enableTooltip !== nextProps.enableTooltip
  ) {
    return false;
  }

  // Compare aspectingPlanets
  if (prevProps.aspectingPlanets?.length !== nextProps.aspectingPlanets?.length) {
    return false;
  }
  if (prevProps.aspectingPlanets && nextProps.aspectingPlanets) {
    for (let i = 0; i < prevProps.aspectingPlanets.length; i++) {
      if (prevProps.aspectingPlanets[i] !== nextProps.aspectingPlanets[i]) {
        return false;
      }
    }
  }

  // For planetSigns: check if data for our planets changed
  if (prevProps.planetSigns !== nextProps.planetSigns) {
    const prevRelevantSigns = prevProps.planetSigns?.filter(ps =>
      prevProps.planets.includes(ps.planet)
    );
    const nextRelevantSigns = nextProps.planetSigns?.filter(ps =>
      nextProps.planets.includes(ps.planet)
    );

    if (prevRelevantSigns?.length !== nextRelevantSigns?.length) {
      return false;
    }

    for (let i = 0; i < (prevRelevantSigns?.length || 0); i++) {
      const prev = prevRelevantSigns?.[i];
      const next = nextRelevantSigns?.[i];
      if (prev?.planet !== next?.planet || prev?.sign !== next?.sign) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Memoized PlanetDisplay component
 * Only re-renders when planet data or positioning changes
 */
export const PlanetDisplay = memo(PlanetDisplayComponent, arePlanetDisplayPropsEqual);
