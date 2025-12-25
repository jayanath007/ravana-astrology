/**
 * Grid Constants
 * Centralized constants for the astrological grid component
 */

// SVG Icon Dimensions
export const ZODIAC_ICON_SIZE = 35;
export const ZODIAC_ICON_OFFSET = ZODIAC_ICON_SIZE / 2; // 17.5

// Image Dimensions
export const ZODIAC_IMAGE_SIZE = 60;
export const ZODIAC_IMAGE_OFFSET = ZODIAC_IMAGE_SIZE / 2; // 30

// Opacity Values
export const ZODIAC_OPACITY_CENTER = 1;
export const ZODIAC_OPACITY_NON_CENTER = 0.25;
export const ZODIAC_IMAGE_OPACITY = 0.15;

// Center Text Layout
export const CENTER_TEXT_Y_OFFSET = 20;
export const CENTER_TEXT_LINE_SPACING = 18;

// Planet Layout Configurations
export const PLANET_LAYOUT = {
  SMALL: {
    // 1-3 planets
    charsPerRow: 2,
    fontSize: 'text-xs',
    lineHeight: 14,
    charSpacing: 14,
    fontSizePx: 12,
    highlightIncrease: 7,
  },
  MEDIUM: {
    // 4-6 planets
    charsPerRow: 2,
    fontSize: 'text-[10px]',
    lineHeight: 12,
    charSpacing: 12,
    fontSizePx: 10,
    highlightIncrease: 7,
  },
  LARGE: {
    // 7-8 planets
    charsPerRow: 3,
    fontSize: 'text-[9px]',
    lineHeight: 11,
    charSpacing: 11,
    fontSizePx: 9,
    highlightIncrease: 7,
  },
} as const;

// Planet Count Thresholds
export const PLANET_COUNT_THRESHOLDS = {
  SMALL_MAX: 3,
  MEDIUM_MAX: 6,
  LARGE_MAX: 8,
} as const;
