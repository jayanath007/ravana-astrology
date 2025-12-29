/**
 * API Configuration
 * Central configuration for all API endpoints and settings
 */

/**
 * Base URL for the Ravana Astrology API
 * TODO: Move this to environment variables for different environments
 */
export const API_BASE_URL = 'http://localhost:5188';

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  birthChart: {
    ascendant: '/api/birthchart/ascendant',
    planetSigns: '/api/birthchart/planet-signs',
    planetSignChange: '/api/birthchart/planet-sign-changes',
    navamsaAscendant: '/api/birthchart/navamsa-ascendant',
    navamsaSigns: '/api/birthchart/navamsa-signs',
  },
  dasha: {
    vimshottari: '/api/dasha/vimshottari',
  },
} as const;

/**
 * Default request headers
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;
