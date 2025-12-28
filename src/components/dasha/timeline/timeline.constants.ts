/**
 * Timeline configuration constants for DashaTimelineControl
 */

/** Total years in Vimshottari Dasha cycle */
export const TIMELINE_TOTAL_YEARS = 120;

/** Slider configuration */
export const SLIDER_CONFIG = {
  MIN: 0,
  MAX: 100,
  STEP: 0.01,
} as const;

/** Minimum segment width percentage to show planet label */
export const MIN_SEGMENT_WIDTH_FOR_LABEL = 5;

/** Divider marker dimensions */
export const DIVIDER_CONFIG = {
  WIDTH: "8px",
  MARGIN_LEFT: "-4px",
} as const;

/** Z-index layering system for timeline elements */
export const Z_INDEX = {
  SEGMENTS: 0,
  SLIDER: 10,
  DIVIDERS: 15,
  POSITION_INDICATOR: 20,
  TOOLTIP: 9999,
} as const;

/** Tooltip styling constants */
export const TOOLTIP_CONFIG = {
  OFFSET_TOP: "-96px", // -top-24 = -96px
  ARROW_SIZE: "6px",
  BG_COLOR: "#111827", // gray-900
} as const;
