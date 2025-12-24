/**
 * Birth Chart Service
 * Handles all API calls related to birth chart calculations
 */

import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '@/config/api';
import type {
  BirthDetails,
  AscendantResponse,
  PlanetSign,
  BirthChartData,
  DivisionChartData,
} from '@/types/birthChart';

/**
 * Custom error class for API errors
 */
export class BirthChartApiError extends Error {
  statusCode?: number;
  endpoint?: string;

  constructor(
    message: string,
    statusCode?: number,
    endpoint?: string
  ) {
    super(message);
    this.name = 'BirthChartApiError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, body: unknown): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new BirthChartApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof BirthChartApiError) {
      throw error;
    }

    // Network or parsing error
    throw new BirthChartApiError(
      `Failed to fetch from ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      endpoint
    );
  }
}

/**
 * Fetches the ascendant (rising sign) for given birth details
 */
export async function getAscendant(birthDetails: BirthDetails): Promise<number> {
  const response = await fetchApi<AscendantResponse>(
    API_ENDPOINTS.birthChart.ascendant,
    birthDetails
  );
  return response.sign;
}

/**
 * Fetches planet positions for given birth details
 */
export async function getPlanetSigns(birthDetails: BirthDetails): Promise<PlanetSign[]> {
  return await fetchApi<PlanetSign[]>(
    API_ENDPOINTS.birthChart.planetSigns,
    birthDetails
  );
}

/**
 * Fetches complete birth chart data (ascendant + planet signs)
 */
export async function getBirthChartData(birthDetails: BirthDetails): Promise<BirthChartData> {
  const [zodiacNumber, planetSigns] = await Promise.all([
    getAscendant(birthDetails),
    getPlanetSigns(birthDetails),
  ]);

  return {
    zodiacNumber,
    planetSigns,
  };
}

/**
 * Fetches Navamsa chart ascendant
 */
export async function getNavamsaAscendant(birthDetails: BirthDetails): Promise<number> {
  const response = await fetchApi<AscendantResponse>(
    API_ENDPOINTS.birthChart.navamsaAscendant,
    birthDetails
  );
  return response.sign;
}

/**
 * Fetches Navamsa planet positions
 */
export async function getNavamsaSigns(birthDetails: BirthDetails): Promise<PlanetSign[]> {
  return await fetchApi<PlanetSign[]>(
    API_ENDPOINTS.birthChart.navamsaSigns,
    birthDetails
  );
}

/**
 * Fetches complete Navamsa chart data
 */
export async function getNavamsaChartData(birthDetails: BirthDetails): Promise<DivisionChartData> {
  const [zodiacNumber, planetSigns] = await Promise.all([
    getNavamsaAscendant(birthDetails),
    getNavamsaSigns(birthDetails),
  ]);

  return {
    zodiacNumber,
    planetSigns,
  };
}

/**
 * Fetches Thathkala (D3) chart data
 * Uses birth details for ascendant and current date/time for planet signs
 */
export async function getThathkalaChartData(
  birthDetails: BirthDetails
): Promise<DivisionChartData> {
  // Get current date and time
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const currentTime = now.toTimeString().slice(0, 5); // Format: HH:mm

  // Create request body with current date/time for planet signs
  const currentDateTimeRequest: BirthDetails = {
    birthDate: currentDate,
    birthTime: currentTime,
    latitude: birthDetails.latitude,
    longitude: birthDetails.longitude,
    timeZoneId: birthDetails.timeZoneId,
  };

  // Fetch ascendant with birth details and planet signs with current date/time
  const [zodiacNumber, planetSigns] = await Promise.all([
    getAscendant(birthDetails),
    getPlanetSigns(currentDateTimeRequest),
  ]);

  return {
    zodiacNumber,
    planetSigns,
  };
}
