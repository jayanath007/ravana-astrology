import { API_BASE_URL, API_ENDPOINTS, DEFAULT_HEADERS } from '@/config/api';
import type {
  VimshottariDashaRequest,
  VimshottariDashaResponse,
} from '@/dashaApiIntegration/vimshottari-dasha.types';

/**
 * Custom error class for Dasha API errors
 */
export class DashaApiError extends Error {
  statusCode?: number;
  endpoint?: string;

  constructor(message: string, statusCode?: number, endpoint?: string) {
    super(message);
    this.name = 'DashaApiError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
  }
}

/**
 * Generic fetch wrapper for API calls
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
      throw new DashaApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DashaApiError) {
      throw error;
    }
    throw new DashaApiError(
      `Failed to fetch from ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      endpoint
    );
  }
}

/**
 * Fetch Vimshottari Dasha data from the API
 */
export async function getVimshottariDasha(
  request: VimshottariDashaRequest
): Promise<VimshottariDashaResponse> {
  return await fetchApi<VimshottariDashaResponse>(
    API_ENDPOINTS.dasha.vimshottari,
    request
  );
}
