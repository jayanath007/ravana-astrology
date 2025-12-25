/**
 * Zodiac Lords
 * Mapping of zodiac signs to their ruling planets
 */

/**
 * Mapping of zodiac sign numbers (1-12) to their ruling planets in Sinhala
 */
export const ZODIAC_LORDS: Record<number, string> = {
  1: 'කු',  // Aries (මේශ) → කුජ (Mars)
  2: 'ශු', // Taurus (වෘෂභ) → ශුක්‍ර (Venus)
  3: 'බු', // Gemini (මිථුන) → බුධ (Mercury)
  4: 'ච',  // Cancer (කර්ක) → චන්ද්‍ර (Moon)
  5: 'ර',  // Leo (සිංහ) → සූර්ය (Sun)
  6: 'බු', // Virgo (කන්‍යා) → බුධ (Mercury)
  7: 'ශු', // Libra (තුලා) → ශුක්‍ර (Venus)
  8: 'කු', // Scorpio (වෘශික) → මංගල (Mars)
  9: 'ගු', // Sagittarius (ධන) → ගුරු (Jupiter)
  10: 'ශ', // Capricorn (මකර) → ශනි (Saturn)
  11: 'ශ', // Aquarius (කුම්භ) → ශනි (Saturn)
  12: 'ගු' // Pisces (මීන) → ගුරු (Jupiter)
} as const;

/**
 * Get the ruling planet for a zodiac sign
 *
 * @param zodiacSignId - The zodiac sign number (1-12)
 * @returns The ruling planet symbol in Sinhala
 */
export function getRulingPlanet(zodiacSignId: number): string {
  return ZODIAC_LORDS[zodiacSignId];
}
