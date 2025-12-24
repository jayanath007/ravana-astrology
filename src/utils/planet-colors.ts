/**
 * Planet-Sign Color Mapping
 *
 * This mapping defines the color for each planet based on the zodiac sign (1-12)
 * Colors are applied when rendering planets in the astrological grid
 *
 * Colors represent astrological significance:
 * - EXALTATION (උච්ච): Blue - Planet is exalted
 * - TRINE (මුලත්‍රිකෝණ): Dark Green - Strong trine position
 * - OWN (ස්වගෘහ): Green - Planet in own house
 * - STRONG (බලවත්): Ash/Gray - Strong position
 * - MEDIUM (මධ්‍යම): Brown - Medium strength
 * - WEAK (දුර්වල): Dark Orange - Weak position
 * - DEBILITATED (නීච / අති දුර්වල): Red - Planet is debilitated
 *
 * Note: All colors are now centralized in src/styles/theme-colors.ts
 */

import { ASTROLOGICAL_COLORS } from '@/styles/theme-colors';

// Planet names in Sinhala (as returned from the API)
export const PLANETS = {
  RA: 'ර',      // සූර්ය (Sun)
  CHA: 'ච',     // චන්ද්‍ර (Moon)
  KU: 'කු',     // මංගල (Mars)
  BU: 'බු',     // බුධ (Mercury)
  GU: 'ගු',     // ගුරු (Jupiter)
  SHU: 'ශු',    // ශුක්‍ර (Venus)
  SHA: 'ශ',     // ශනි (Saturn)
  RAA: 'රා',    // රහු (Rahu)
  KE: 'කේ',     // කේතු (Ketu)
} as const;

// Color definitions based on astrological significance
// Import from centralized theme configuration
export const PLANET_COLORS = ASTROLOGICAL_COLORS;

// Planet-Sign color mapping table
// Rows: Signs 1-12 (රාශි අංකය)
// Columns: Planets (ර, ච, කු, බු, ගු, ශු, ශ, රා, කේ)
const PLANET_SIGN_COLOR_MAP: Record<number, Record<string, string>> = {
  1: { // මේෂ
    [PLANETS.RA]: PLANET_COLORS.EXALTATION,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.TRINE,
    [PLANETS.BU]: PLANET_COLORS.STRONG,
    [PLANETS.GU]: PLANET_COLORS.STRONG,
    [PLANETS.SHU]: PLANET_COLORS.WEAK,
    [PLANETS.SHA]: PLANET_COLORS.DEBILITATED,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  2: { // වෘෂභ
    [PLANETS.RA]: PLANET_COLORS.STRONG,
    [PLANETS.CHA]: PLANET_COLORS.EXALTATION,
    [PLANETS.KU]: PLANET_COLORS.MEDIUM,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHU]: PLANET_COLORS.TRINE,
    [PLANETS.SHA]: PLANET_COLORS.OWN,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.WEAK,
  },
  3: { // මිථුන
    [PLANETS.RA]: PLANET_COLORS.MEDIUM,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.WEAK,
    [PLANETS.BU]: PLANET_COLORS.TRINE,
    [PLANETS.GU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHU]: PLANET_COLORS.STRONG,
    [PLANETS.SHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.RAA]: PLANET_COLORS.TRINE,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  4: { // කටක
    [PLANETS.RA]: PLANET_COLORS.MEDIUM,
    [PLANETS.CHA]: PLANET_COLORS.TRINE,
    [PLANETS.KU]: PLANET_COLORS.WEAK,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.EXALTATION,
    [PLANETS.SHU]: PLANET_COLORS.STRONG,
    [PLANETS.SHA]: PLANET_COLORS.DEBILITATED,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  5: {  // සිංහ
    [PLANETS.RA]: PLANET_COLORS.TRINE,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.OWN,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.STRONG,
    [PLANETS.SHU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  6: { // කන්‍යා
    [PLANETS.RA]: PLANET_COLORS.MEDIUM,
    [PLANETS.CHA]: PLANET_COLORS.STRONG,
    [PLANETS.KU]: PLANET_COLORS.WEAK,
    [PLANETS.BU]: PLANET_COLORS.EXALTATION,
    [PLANETS.GU]: PLANET_COLORS.TRINE,
    [PLANETS.SHU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHA]: PLANET_COLORS.STRONG,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.WEAK,
  },
  7: { // තුලා
    [PLANETS.RA]: PLANET_COLORS.DEBILITATED,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.MEDIUM,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHU]: PLANET_COLORS.TRINE,
    [PLANETS.SHA]: PLANET_COLORS.EXALTATION,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.TRINE,
  },
  8: {
    [PLANETS.RA]: PLANET_COLORS.MEDIUM,
    [PLANETS.CHA]: PLANET_COLORS.DEBILITATED,
    [PLANETS.KU]: PLANET_COLORS.TRINE,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHA]: PLANET_COLORS.WEAK,
    [PLANETS.RAA]: PLANET_COLORS.TRINE,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  9: { // ධනු
    [PLANETS.RA]: PLANET_COLORS.MEDIUM,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.MEDIUM,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.TRINE,
    [PLANETS.SHU]: PLANET_COLORS.EXALTATION,
    [PLANETS.SHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  10: { // මකර
    [PLANETS.RA]: PLANET_COLORS.DEBILITATED,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.EXALTATION,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHU]: PLANET_COLORS.WEAK,
    [PLANETS.SHA]: PLANET_COLORS.OWN,
    [PLANETS.RAA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  11: { // කුම්භ
    [PLANETS.RA]: PLANET_COLORS.MEDIUM,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.MEDIUM,
    [PLANETS.BU]: PLANET_COLORS.MEDIUM,
    [PLANETS.GU]: PLANET_COLORS.WEAK,
    [PLANETS.SHU]: PLANET_COLORS.MEDIUM,
    [PLANETS.SHA]: PLANET_COLORS.OWN,
    [PLANETS.RAA]: PLANET_COLORS.OWN,
    [PLANETS.KE]: PLANET_COLORS.MEDIUM,
  },
  12: { // මීන
    [PLANETS.RA]: PLANET_COLORS.MEDIUM,
    [PLANETS.CHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.KU]: PLANET_COLORS.MEDIUM,
    [PLANETS.BU]: PLANET_COLORS.WEAK,
    [PLANETS.GU]: PLANET_COLORS.TRINE,
    [PLANETS.SHU]: PLANET_COLORS.EXALTATION,
    [PLANETS.SHA]: PLANET_COLORS.MEDIUM,
    [PLANETS.RAA]: PLANET_COLORS.WEAK,
    [PLANETS.KE]: PLANET_COLORS.OWN,
  },
};

/**
 * Get the color for a planet based on its zodiac sign
 * @param planet - The planet name (in Sinhala)
 * @param sign - The zodiac sign number (1-12)
 * @returns The color hex code, or a default gray if not found
 */
export function getPlanetColor(planet: string, sign: number): string {
  // Validate sign is within range
  if (sign < 1 || sign > 12) {
    console.warn(`Invalid sign number: ${sign}. Must be between 1 and 12.`);
    return PLANET_COLORS.STRONG;
  }

  // Get the color from the mapping
  const signColors = PLANET_SIGN_COLOR_MAP[sign];
  if (!signColors) {
    console.warn(`No color mapping found for sign: ${sign}`);
    return PLANET_COLORS.STRONG;
  }

  const color = signColors[planet];
  if (!color) {
    console.warn(`No color mapping found for planet "${planet}" in sign ${sign}`);
    return PLANET_COLORS.STRONG;
  }

  return color;
}
