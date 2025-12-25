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
export const CENTER_GRID_TITLE = 'නවංශකය';

// Planet Font Size Configuration (adjustable)
export const PLANET_FONT_CONFIG = {
  SMALL_SIZE: 18,    // Font size for 1-3 planets (increased from 12px)
  MEDIUM_SIZE: 16,   // Font size for 4-6 planets (increased from 10px)
  LARGE_SIZE: 14,    // Font size for 7-8 planets (increased from 9px)
  HIGHLIGHT_INCREASE: 7, // Additional pixels when highlighted
} as const;

// Planet Layout Configurations
export const PLANET_LAYOUT = {
  SMALL: {
    // 1-3 planets
    charsPerRow: 2,
    fontSize: `text-[${PLANET_FONT_CONFIG.SMALL_SIZE}px]`,
    lineHeight: PLANET_FONT_CONFIG.SMALL_SIZE + 4,
    charSpacing: PLANET_FONT_CONFIG.SMALL_SIZE + 2,
    fontSizePx: PLANET_FONT_CONFIG.SMALL_SIZE,
    highlightIncrease: PLANET_FONT_CONFIG.HIGHLIGHT_INCREASE,
  },
  MEDIUM: {
    // 4-6 planets
    charsPerRow: 2,
    fontSize: `text-[${PLANET_FONT_CONFIG.MEDIUM_SIZE}px]`,
    lineHeight: PLANET_FONT_CONFIG.MEDIUM_SIZE + 2,
    charSpacing: PLANET_FONT_CONFIG.MEDIUM_SIZE + 2,
    fontSizePx: PLANET_FONT_CONFIG.MEDIUM_SIZE,
    highlightIncrease: PLANET_FONT_CONFIG.HIGHLIGHT_INCREASE,
  },
  LARGE: {
    // 7-8 planets
    charsPerRow: 3,
    fontSize: `text-[${PLANET_FONT_CONFIG.LARGE_SIZE}px]`,
    lineHeight: PLANET_FONT_CONFIG.LARGE_SIZE + 2,
    charSpacing: PLANET_FONT_CONFIG.LARGE_SIZE + 1,
    fontSizePx: PLANET_FONT_CONFIG.LARGE_SIZE,
    highlightIncrease: PLANET_FONT_CONFIG.HIGHLIGHT_INCREASE,
  },
} as const;

// Planet Count Thresholds
export const PLANET_COUNT_THRESHOLDS = {
  SMALL_MAX: 3,
  MEDIUM_MAX: 6,
  LARGE_MAX: 8,
} as const;
