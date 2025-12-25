/**
 * Planet Layout
 * Utilities for calculating planet positioning in grid areas
 */

import { PLANET_LAYOUT, PLANET_COUNT_THRESHOLDS } from './grid-constants';

export interface PlanetLayoutConfig {
  charsPerRow: number;
  fontSize: string;
  lineHeight: number;
  charSpacing: number;
  fontSizePx: number;
  highlightIncrease: number;
}

export interface PlanetPosition {
  x: number;
  y: number;
  adjustedFontSize: string;
}

/**
 * Determine layout configuration based on planet count
 *
 * @param itemCount - Number of planets to display
 * @returns Layout configuration object
 */
export function getLayoutConfig(itemCount: number): PlanetLayoutConfig {
  if (itemCount <= PLANET_COUNT_THRESHOLDS.SMALL_MAX) {
    return PLANET_LAYOUT.SMALL;
  } else if (itemCount <= PLANET_COUNT_THRESHOLDS.MEDIUM_MAX) {
    return PLANET_LAYOUT.MEDIUM;
  } else {
    return PLANET_LAYOUT.LARGE;
  }
}

/**
 * Calculate adjusted font size when planet is highlighted
 *
 * @param fontSizePx - Base font size in pixels
 * @param highlightIncrease - Amount to increase font size
 * @returns Adjusted font size class
 */
export function getHighlightedFontSize(
  fontSizePx: number,
  highlightIncrease: number
): string {
  return `text-[${fontSizePx + highlightIncrease}px]`;
}

/**
 * Calculate position for a planet in the grid layout
 *
 * @param index - Planet index in the array
 * @param itemCount - Total number of planets
 * @param config - Layout configuration
 * @param centerX - Center X coordinate of the grid area
 * @param centerY - Center Y coordinate of the grid area
 * @param isHighlighted - Whether this planet is highlighted
 * @returns Position object with x, y coordinates and font sizes
 */
export function calculatePlanetPosition(
  index: number,
  itemCount: number,
  config: PlanetLayoutConfig,
  centerX: number,
  centerY: number,
  isHighlighted: boolean
): PlanetPosition {
  const { charsPerRow, fontSize, lineHeight, charSpacing, fontSizePx, highlightIncrease } = config;

  // Calculate grid layout
  const numRows = Math.ceil(itemCount / charsPerRow);
  const startY = centerY - ((numRows - 1) * lineHeight) / 2;

  // Calculate row and column for this item
  const row = Math.floor(index / charsPerRow);
  const col = index % charsPerRow;
  const charsInThisRow = Math.min(charsPerRow, itemCount - row * charsPerRow);

  // Calculate x position (centered within the row)
  const xOffset = (col - (charsInThisRow - 1) / 2) * charSpacing;
  const yOffset = row * lineHeight;

  // Adjust font size if highlighted
  const adjustedFontSize = isHighlighted
    ? getHighlightedFontSize(fontSizePx, highlightIncrease)
    : fontSize;

  return {
    x: centerX + xOffset,
    y: startY + yOffset,
    adjustedFontSize,
  };
}
