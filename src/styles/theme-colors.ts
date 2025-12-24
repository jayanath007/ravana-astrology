/**
 * Centralized Color Configuration
 *
 * All application colors are defined here for easy theme management.
 * Update colors in this file to change the entire application theme.
 */

// ============================================================================
// ASTROLOGICAL COLORS - Planet significance colors
// ============================================================================

export const ASTROLOGICAL_COLORS = {
  EXALTATION: '#0000FF',       // උච්ච (Blue) - Planet is exalted
  TRINE: '#10d410ff',          // මුලත්‍රිකෝණ (Dark Green) - Strong trine position
  OWN: '#008000',              // ස්වගෘහ (Green) - Planet in own house
  STRONG: '#A9A9A9',           // බලවත් (Ash/Gray) - Strong position
  MEDIUM: '#0a0a0aff',         // මධ්‍යම (Brown) - Medium strength
  WEAK: '#97580bff',           // දුර්වල (Dark Orange) - Weak position
  DEBILITATED: '#FF0000',      // නීච / අති දුර්වල (Red) - Planet is debilitated
} as const;

// ============================================================================
// GRID COLORS - Shape borders and fills
// ============================================================================

export const GRID_COLORS = {
  // Shape borders (default state)
  BORDER_DEFAULT_LIGHT: '#166534',      // green-800 - Dark green border (light mode)
  BORDER_DEFAULT_DARK: '#15803d',       // green-700 - Dark green border (dark mode)

  // Shape borders (hover state)
  BORDER_HOVER_LIGHT: '#15803d',        // green-700 - Border on hover (light mode)
  BORDER_HOVER_DARK: '#22c55e',         // green-500 - Border on hover (dark mode)

  // Shape borders (selected state)
  BORDER_SELECTED_LIGHT: '#16a34a',     // green-600 - Border when selected (light mode)
  BORDER_SELECTED_DARK: '#4ade80',      // green-400 - Border when selected (dark mode)

  // Shape fills (default state)
  FILL_DEFAULT_LIGHT: '#f5f5f5',        // neutral-100 - Light gray fill (light mode)
  FILL_DEFAULT_DARK: '#262626',         // neutral-800 - Dark gray fill (dark mode)

  // Shape fills (hover state)
  FILL_HOVER_LIGHT: '#e5e5e5',          // neutral-200 - Medium gray on hover (light mode)
  FILL_HOVER_DARK: '#404040',           // neutral-700 - Lighter gray on hover (dark mode)

  // Shape fills (selected state)
  FILL_SELECTED_LIGHT: '#dcfce7',       // green-100 - Light green when selected (light mode)
  FILL_SELECTED_DARK: '#14532d',        // green-900 - Dark green when selected (dark mode)

  // Center shape
  BORDER_CENTER_LIGHT: '#a3a3a3',       // neutral-400 - Center border (light mode)
  BORDER_CENTER_DARK: '#525252',        // neutral-600 - Center border (dark mode)

  // Border width
  BORDER_WIDTH: '2',                    // Consistent 2px border for all shapes
} as const;

// ============================================================================
// INTERACTION COLORS - Highlights and selections
// ============================================================================

export const INTERACTION_COLORS = {
  // Highlight square size
  PLANET_HIGHLIGHT_SIZE: '20',          // 20px size for highlight squares

  // Aspecting planet highlight (when area is selected and planet aspects it)
  ASPECTING_HIGHLIGHT_OPACITY: '0.7',   // 70% opacity for aspecting highlight squares
} as const;

// ============================================================================
// UI COLORS - General interface elements
// ============================================================================

export const UI_COLORS = {
  // Back button
  BACK_BUTTON_BG: '#525252',            // neutral-600 - Background
  BACK_BUTTON_BG_HOVER: '#404040',      // neutral-700 - Background on hover
  BACK_BUTTON_TEXT: '#ffffff',          // white - Text color

  // Grid container border
  GRID_BORDER_LIGHT: '#d4d4d4',         // neutral-300 - Grid container border (light mode)
  GRID_BORDER_DARK: '#404040',          // neutral-700 - Grid container border (dark mode)
} as const;

// ============================================================================
// TAILWIND CLASS MAPPING
// ============================================================================

/**
 * Helper object to map color values to Tailwind classes
 * Use this when you need to apply colors via className
 */
export const TAILWIND_CLASSES = {
  // Grid shape classes
  grid: {
    borderDefault: 'stroke-green-800 dark:stroke-green-700',
    borderHover: 'stroke-green-700 dark:stroke-green-500',
    borderSelected: 'stroke-green-600 dark:stroke-green-400',
    fillDefault: 'fill-neutral-100 dark:fill-neutral-800',
    fillHover: 'fill-neutral-200 dark:fill-neutral-700',
    fillSelected: 'fill-green-100 dark:fill-green-900',
    borderCenter: 'stroke-neutral-400 dark:stroke-neutral-600',
    borderWidth: 'stroke-2',
  },

  // Aspecting planet highlight class
  aspectingHighlight: 'fill-orange-200 dark:fill-orange-400',

  // UI element classes
  ui: {
    backButton: 'bg-neutral-600 hover:bg-neutral-700 text-white',
    gridBorder: 'border-neutral-300 dark:border-neutral-700',
  },
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

export const THEME = {
  astrological: ASTROLOGICAL_COLORS,
  grid: GRID_COLORS,
  interaction: INTERACTION_COLORS,
  ui: UI_COLORS,
  classes: TAILWIND_CLASSES,
} as const;

export default THEME;
