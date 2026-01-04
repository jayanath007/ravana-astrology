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

/**
 * Planetary movement event (sign change)
 */
export interface PlanetaryMovementEvent {
  planet: string;
  eventType: string;
  eventDateTime: string;
  fromSign: number;
  toSign: number;
  fromSignName: string;
  toSignName: string;
}

/**
 * Request body for planetary movements API
 */
export interface PlanetaryMovementsRequest {
  startDateTime: string;
  endDateTime: string;
  latitude: number;
  longitude: number;
  timeZoneId: string;
}

/**
 * Response from planetary movements API
 */
export interface PlanetaryMovementsResponse {
  startDateTime: string;
  endDateTime: string;
  totalEvents: number;
  events: PlanetaryMovementEvent[];
}
