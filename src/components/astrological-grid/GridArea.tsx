/**
 * GridArea Component
 * Renders individual grid cells in the astrological chart
 * Refactored to follow DRY principles and industry best practices
 */

import { useState, useMemo, memo } from 'react';
import type { AreaConfig } from './types';
import { cn } from '@/lib/utils';
import { getZodiacSignByAreaId } from './zodiac-config';
import { getZodiacNameSinhala } from '@/utils/zodiac-names';
import { calculateZodiacSignId } from '@/utils/zodiac-calculations';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';
import { CENTER_TEXT_Y_OFFSET, CENTER_TEXT_LINE_SPACING, CENTER_GRID_TITLE } from './grid-constants';
import { ZodiacWatermark } from './ZodiacWatermark';
import { PlanetDisplay } from './PlanetDisplay';
import { GridShape } from './GridShape';

interface GridAreaProps {
  config: AreaConfig;
  letter: string[];
  offsetValue: number;
  planetSigns?: PlanetSign[];
  isSelected?: boolean;
  onSelect?: (areaId: number) => void;
  aspectingPlanets?: string[];
  highlightedPlanet?: string | null;
  title?: string;
}

function GridAreaComponent({
  config,
  letter,
  offsetValue,
  planetSigns,
  isSelected = false,
  onSelect,
  aspectingPlanets = [],
  highlightedPlanet = null,
  title,
}: GridAreaProps) {
  // Use CENTER_GRID_TITLE as fallback only if title is undefined
  const displayTitle = title ?? CENTER_GRID_TITLE;
  const [isHovered, setIsHovered] = useState(false);

  // Calculate zodiac sign using shared utility
  const calculatedZodiacSign = useMemo(() => {
    const signId = calculateZodiacSignId(config.id, offsetValue);
    return getZodiacSignByAreaId(signId);
  }, [offsetValue, config.id]);

  const hasLetters = letter.length > 0;

  const handleClick = () => {
    if (!config.isCenter && onSelect) {
      onSelect(config.id);
    }
  };

  const handleMouseEnter = () => {
    if (!config.isCenter) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!config.isCenter) setIsHovered(false);
  };

  const shapeClasses = cn(
    'transition-all duration-200',
    TAILWIND_CLASSES.grid.borderWidth,
    config.isCenter
      ? cn(
          TAILWIND_CLASSES.grid.fillDefault,
          TAILWIND_CLASSES.grid.borderDefault
        )
      : cn(
          TAILWIND_CLASSES.grid.fillDefault,
          'cursor-pointer',
          isSelected &&
            cn(
              TAILWIND_CLASSES.grid.fillSelected,
              TAILWIND_CLASSES.grid.borderSelected
            ),
          !isSelected &&
            isHovered &&
            cn(
              TAILWIND_CLASSES.grid.fillHover,
              TAILWIND_CLASSES.grid.borderHover
            ),
          !isSelected && !isHovered && TAILWIND_CLASSES.grid.borderDefault
        )
  );

  return (
    <g>
      {/* Grid shape (triangle or rectangle) */}
      <GridShape
        config={config}
        shapeClasses={shapeClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      {/* Center area zodiac name */}
      {config.isCenter && (
        <>
          <text
            x={config.position.x}
            y={config.position.y + CENTER_TEXT_Y_OFFSET}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none text-sm font-bold text-neutral-900 dark:text-neutral-100"
          >
            {getZodiacNameSinhala(calculateZodiacSignId(config.id, offsetValue))}
          </text>
          <text
            x={config.position.x}
            y={config.position.y + CENTER_TEXT_Y_OFFSET + CENTER_TEXT_LINE_SPACING}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none text-sm font-bold text-neutral-900 dark:text-neutral-100"
          >
            {displayTitle}
          </text>
        </>
      )}

      {/* Zodiac watermark */}
      {calculatedZodiacSign && (
        <ZodiacWatermark
          zodiacSign={calculatedZodiacSign}
          x={config.position.x}
          y={config.position.y}
          isCenter={config.isCenter}
        />
      )}

      {/* Planet display */}
      {hasLetters && !config.isCenter && (
        <PlanetDisplay
          planets={letter}
          centerX={config.position.x}
          centerY={config.position.y}
          planetSigns={planetSigns}
          aspectingPlanets={aspectingPlanets}
          highlightedPlanet={highlightedPlanet}
          enableTooltip={displayTitle === 'ලග්නය' || displayTitle === 'ගෝචරය'}
        />
      )}
    </g>
  );
}

/**
 * Custom comparison function for React.memo
 * Compares GridArea props to determine if re-render is needed
 */
function areGridAreaPropsEqual(
  prevProps: GridAreaProps,
  nextProps: GridAreaProps
): boolean {
  // Compare primitives
  if (
    prevProps.offsetValue !== nextProps.offsetValue ||
    prevProps.isSelected !== nextProps.isSelected ||
    prevProps.highlightedPlanet !== nextProps.highlightedPlanet ||
    prevProps.title !== nextProps.title ||
    prevProps.config.id !== nextProps.config.id
  ) {
    return false;
  }

  // Compare letter arrays (planets in this area)
  if (prevProps.letter.length !== nextProps.letter.length) {
    return false;
  }
  for (let i = 0; i < prevProps.letter.length; i++) {
    if (prevProps.letter[i] !== nextProps.letter[i]) {
      return false;
    }
  }

  // Compare aspectingPlanets arrays
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

  return true;
}

/**
 * Memoized GridArea component
 * Only re-renders when its specific props change
 */
export const GridArea = memo(GridAreaComponent, areGridAreaPropsEqual);
