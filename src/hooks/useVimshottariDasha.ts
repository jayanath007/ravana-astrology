import { useState, useEffect, useCallback } from 'react';
import { getVimshottariDasha } from '@/services/dashaService';
import { parseVimshottariDashaResponse } from '@/dashaApiIntegration/vimshottari-dasha.utils';
import type {
  VimshottariDashaRequest,
  ParsedVimshottariDashaResponse,
  DashaLevel,
} from '@/dashaApiIntegration/vimshottari-dasha.types';
import type { BirthDetails } from '@/types/birthChart';

/**
 * Options for the useVimshottariDasha hook
 */
interface UseVimshottariDashaOptions {
  /** Birth details for the person */
  birthDetails: BirthDetails | undefined;
  /** Detail level for dasha calculation (1-4) */
  detailLevel?: DashaLevel;
  /** Number of years to calculate from birth (1-120) */
  yearsToCalculate?: number;
  /** Whether to enable automatic fetching */
  enabled?: boolean;
}

/**
 * Return type for the useVimshottariDasha hook
 */
interface UseVimshottariDashaReturn {
  /** Parsed dasha data with Date objects */
  data: ParsedVimshottariDashaResponse | null;
  /** Whether the data is currently loading */
  isLoading: boolean;
  /** Error message if the fetch failed */
  error: string | null;
  /** Function to retry fetching the data */
  retry: () => void;
}

/**
 * Custom hook for fetching and managing Vimshottari Dasha data
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, retry } = useVimshottariDasha({
 *   birthDetails,
 *   detailLevel: DashaLevel.Antardasha,
 *   yearsToCalculate: 120,
 * });
 * ```
 */
export function useVimshottariDasha(
  options: UseVimshottariDashaOptions
): UseVimshottariDashaReturn {
  const {
    birthDetails,
    detailLevel = 2, // Default to Antardasha level
    yearsToCalculate = 120,
    enabled = true,
  } = options;

  const [data, setData] = useState<ParsedVimshottariDashaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchDashaData = useCallback(async () => {
    if (!birthDetails || !enabled) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: VimshottariDashaRequest = {
        birthDate: birthDetails.birthDate,
        birthTime: birthDetails.birthTime,
        latitude: birthDetails.latitude,
        longitude: birthDetails.longitude,
        timeZoneId: birthDetails.timeZoneId,
        detailLevel,
        yearsToCalculate,
      };

      const response = await getVimshottariDasha(request);
      const parsedData = parseVimshottariDashaResponse(response);
      setData(parsedData);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to fetch Vimshottari Dasha data';
      setError(errorMessage);
      console.error('Error fetching Vimshottari Dasha:', err);
    } finally {
      setIsLoading(false);
    }
  }, [birthDetails, detailLevel, yearsToCalculate, enabled]);

  useEffect(() => {
    fetchDashaData();
  }, [fetchDashaData, retryCount]);

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  return {
    data,
    isLoading,
    error,
    retry,
  };
}
