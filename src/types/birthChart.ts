/**
 * Birth Chart Type Definitions
 * Contains all type definitions related to birth chart calculations
 */

/**
 * Birth details input from the user
 */
export interface BirthDetails {
  birthDate: string;
  birthTime: string;
  latitude: number;
  longitude: number;
  timeZoneId: string;
}

/**
 * Planet and its zodiac sign position
 */
export interface PlanetSign {
  planet: string;
  sign: number;
  nextSignChangeDate?: string;
  lastSignChangeDate?: string;
}

/**
 * Ascendant response from API
 */
export interface AscendantResponse {
  sign: number;
}

/**
 * Complete birth chart data
 */
export interface BirthChartData {
  zodiacNumber: number;
  planetSigns: PlanetSign[];
}

/**
 * Division chart data (Navamsa, Drekkana, etc.)
 */
export interface DivisionChartData {
  zodiacNumber: number;
  planetSigns: PlanetSign[];
}
