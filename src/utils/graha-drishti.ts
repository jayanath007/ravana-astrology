/**
 * Graha Drishti (Planetary Aspects) Calculations
 *
 * This module handles the calculation of planetary aspects based on Vedic astrology.
 * Each planet has specific aspect values that determine which signs it influences.
 *
 * Graha Drishti Table:
 * - ර (Ravi/Sun): 7
 * - ච (Chandra/Moon): 7
 * - කු (Kuja/Mars): 4, 7, 8
 * - බු (Budha/Mercury): 7
 * - ගු (Guru/Jupiter): 5, 7, 9
 * - ශු (Shukra/Venus): 7
 * - ශ (Shani/Saturn): 3, 7, 10
 * - රා (Rahu): 5, 7, 9
 * - කේ (Ketu): 5, 7, 9
 */

import { PLANETS } from './planet-colors';

// Type definition for planet-sign data from API
export interface PlanetSign {
  planet: string;
  sign: number;
}

// Graha Drishti mapping: planet -> aspect values
const GRAHA_DRISHTI_MAP: Record<string, number[]> = {
  [PLANETS.RA]:  [3, 7, 10],           // ර - සූර්ය (Sun)
  [PLANETS.CHA]: [3, 7, 10],          // ච - චන්ද්‍ර (Moon)
  [PLANETS.KU]:  [4, 7, 8],     // කු - මංගල (Mars)
  [PLANETS.BU]:  [4, 7, 8],           // බු - බුධ (Mercury)
  [PLANETS.GU]:  [5, 7, 9],     // ගු - ගුරු (Jupiter)
  [PLANETS.SHU]: [5, 7, 9],          // ශු - ශුක්‍ර (Venus)
  [PLANETS.SHA]: [3, 7, 10],   // ශ - ශනි (Saturn)
  [PLANETS.RAA]: [7],    // රා - රහු (Rahu)
  [PLANETS.KE]:  [7],     // කේ - කේතු (Ketu)
};

/**
 * Calculate Graha Drishti (planetary aspects) for a list of planet-sign data
 *
 * For each planet in the input array:
 * 1. Get the planet's Graha Drishti values from the table
 * 2. Add each drishti value to the planet's sign position
 * 3. Apply modulo 12 to get the resulting aspected signs
 * 4. Store the planet in the dictionary for each aspected sign
 *
 * @param planetSigns - Array of planet-sign data from API
 * @returns Map where key is sign number (0-11) and value is array of planets aspecting that sign
 *
 * @example
 * const data = [{ planet: "ශ", sign: 6 }];
 * const result = calculateGrahaDrishti(data);
 * // Result: Map {
 * //   9 => ["ශ"],  // (6 + 3) % 12 = 9
 * //   1 => ["ශ"],  // (6 + 7) % 12 = 1
 * //   4 => ["ශ"]   // (6 + 10) % 12 = 4
 * // }
 */
export function calculateGrahaDrishti(planetSigns: PlanetSign[]): Map<number, string[]> {
  const grahaDrishtiDictionary = new Map<number, string[]>();

  // Process each planet-sign pair
  for (const { planet, sign } of planetSigns) {
    // Get the Graha Drishti values for this planet
    const drishtiValues = GRAHA_DRISHTI_MAP[planet];

    if (!drishtiValues) {
      console.warn(`No Graha Drishti mapping found for planet: ${planet}`);
      continue;
    }

    // Calculate aspected signs for each drishti value
    for (const drishtiValue of drishtiValues) {
      // Add drishti value to sign and apply modulo 12
      const aspectedSign = ((sign + (drishtiValue + 1 )) % 12)+1;

      // Add planet to the array for this aspected sign
      if (grahaDrishtiDictionary.has(aspectedSign)) {
        grahaDrishtiDictionary.get(aspectedSign)!.push(planet);
      } else {
        grahaDrishtiDictionary.set(aspectedSign, [planet]);
      }
    }
  }

  return grahaDrishtiDictionary;
}

/**
 * Get all planets aspecting a specific sign
 *
 * @param sign - The sign number (0-11)
 * @param grahaDrishtiMap - The calculated Graha Drishti map
 * @returns Array of planets aspecting the sign, or empty array if none
 */
export function getPlanetsAspectingSign(
  sign: number,
  grahaDrishtiMap: Map<number, string[]>
): string[] {
  return grahaDrishtiMap.get(sign) || [];
}

/**
 * Get a formatted string of all aspects for debugging
 *
 * @param grahaDrishtiMap - The calculated Graha Drishti map
 * @returns Formatted string showing all sign-planet aspect relationships
 */
export function formatGrahaDrishtiMap(grahaDrishtiMap: Map<number, string[]>): string {
  const entries: string[] = [];

  for (const [sign, planets] of grahaDrishtiMap.entries()) {
    entries.push(`Sign ${sign}: [${planets.join(', ')}]`);
  }

  return entries.join('\n');
}

/**
 * Convert Graha Drishti Map to plain object for JSON serialization
 *
 * @param grahaDrishtiMap - The calculated Graha Drishti map
 * @returns Plain object with sign numbers as keys and planet arrays as values
 *
 * @example
 * const map = new Map([[9, ["ශ"]], [1, ["ශ"]], [4, ["ශ"]]]);
 * const obj = grahaDrishtiMapToObject(map);
 * // Result: { "9": ["ශ"], "1": ["ශ"], "4": ["ශ"] }
 */
export function grahaDrishtiMapToObject(
  grahaDrishtiMap: Map<number, string[]>
): Record<number, string[]> {
  const result: Record<number, string[]> = {};

  for (const [sign, planets] of grahaDrishtiMap.entries()) {
    result[sign] = planets;
  }

  return result;
}
