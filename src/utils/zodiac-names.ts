/**
 * Zodiac Names Utility
 * Maps zodiac numbers (1-12) to their Sinhala names
 */

/**
 * Zodiac signs in Sinhala
 * Index corresponds to zodiac number (1-12)
 */
export const ZODIAC_NAMES_SINHALA: Record<number, string> = {
  1: 'මේෂ',        // Mesha (Aries)
  2: 'වෘෂභ',      // Vrishabha (Taurus)
  3: 'මිථුන',      // Mithuna (Gemini)
  4: 'කර්කට',     // Karka (Cancer)
  5: 'සිංහ',       // Simha (Leo)
  6: 'කන්‍යා',      // Kanya (Virgo)
  7: 'තුලා',       // Tula (Libra)
  8: 'වෘශ්චික',    // Vrishchika (Scorpio)
  9: 'ධනු',        // Dhanu (Sagittarius)
  10: 'මකර',      // Makara (Capricorn)
  11: 'කුම්භ',     // Kumbha (Aquarius)
  12: 'මීන',       // Meena (Pisces)
};

/**
 * Get Sinhala name for a zodiac number
 * @param zodiacNumber - The zodiac number (1-12)
 * @returns The Sinhala name of the zodiac sign
 *
 * @example
 * getZodiacNameSinhala(1) // Returns 'මේෂ'
 * getZodiacNameSinhala(5) // Returns 'සිංහ'
 */
export function getZodiacNameSinhala(zodiacNumber: number): string {
  // Normalize the zodiac number to 1-12 range
  const normalizedNumber = ((zodiacNumber - 1) % 12) + 1;
  return ZODIAC_NAMES_SINHALA[normalizedNumber] || '';
}
