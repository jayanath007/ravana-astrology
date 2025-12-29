/**
 * Planet Name Utilities
 * Maps planet abbreviations to full names and Sinhala translations
 */

/**
 * Maps Sinhala planet abbreviations to English full names
 */
export const PLANET_ABBR_TO_ENGLISH: Record<string, string> = {
  'ර': 'Sun',      // සූර්ය (Ravi)
  'ච': 'Moon',     // චන්ද්‍ර (Chandra)
  'කු': 'Mars',    // මංගල (Kuja)
  'බු': 'Mercury', // බුධ (Budha)
  'ගු': 'Jupiter', // ගුරු (Guru)
  'ශු': 'Venus',   // ශුක්‍ර (Shukra)
  'ශ': 'Saturn',   // ශනි (Shani)
  'රා': 'Rahu',    // රහු (Rahu)
  'කේ': 'Ketu',    // කේතු (Ketu)
};

/**
 * Maps Sinhala planet abbreviations to full Sinhala names
 */
export const PLANET_ABBR_TO_SINHALA: Record<string, string> = {
  'ර': 'සූර්ය',      // Sun (Ravi)
  'ච': 'චන්ද්‍ර',    // Moon (Chandra)
  'කු': 'කුජ',       // Mars (Kuja)
  'බු': 'බුධ',       // Mercury (Budha)
  'ගු': 'ගුරු',      // Jupiter (Guru)
  'ශු': 'ශුක්‍ර',    // Venus (Shukra)
  'ශ': 'ශනි',       // Saturn (Shani)
  'රා': 'රාහු',      // Rahu
  'කේ': 'කේතු',      // Ketu
};

/**
 * Get English full name from Sinhala abbreviation
 * @param abbr - The Sinhala abbreviation
 * @returns The English full name
 */
export function getPlanetEnglishName(abbr: string): string {
  return PLANET_ABBR_TO_ENGLISH[abbr] || abbr;
}

/**
 * Get Sinhala full name from Sinhala abbreviation
 * @param abbr - The Sinhala abbreviation
 * @returns The full Sinhala name
 */
export function getPlanetSinhalaName(abbr: string): string {
  return PLANET_ABBR_TO_SINHALA[abbr] || abbr;
}
