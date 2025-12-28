import { useState, useEffect, useCallback } from 'react';
import {
  getBirthChartData,
  getNavamsaChartData,
  getThathkalaChartData,
  BirthChartApiError,
} from '@/services/birthChartService';
import type { BirthDetails, PlanetSign } from '@/types/birthChart';

/**
 * Chart type options
 */
export type ChartType = 'rasi' | 'navamsa' | 'thathkala';

/**
 * Options for the useChartData hook
 */
interface UseChartDataOptions {
  chartType: ChartType;
  birthDetails: BirthDetails | null;
  selectedDate?: Date; // Only used for Thathkala chart
}

/**
 * Return type for the useChartData hook
 */
interface UseChartDataReturn {
  zodiacNumber: number | undefined;
  planetSigns: PlanetSign[] | undefined;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

/**
 * Custom hook for fetching chart data for all chart types (rasi, navamsa, thathkala)
 *
 * Consolidates data fetching logic that was previously duplicated in ChartCard.
 * Handles loading states, error handling, and retry mechanism.
 *
 * @param options - Configuration for chart fetching
 * @param options.chartType - Type of chart ('rasi' | 'navamsa' | 'thathkala')
 * @param options.birthDetails - Birth details for calculation
 * @param options.selectedDate - Optional date for Thathkala chart (current planetary positions)
 *
 * @returns Chart data with loading and error states, plus a retry function
 *
 * @example
 * const rasiChart = useChartData({
 *   chartType: 'rasi',
 *   birthDetails
 * });
 *
 * @example
 * const thathkalaChart = useChartData({
 *   chartType: 'thathkala',
 *   birthDetails,
 *   selectedDate: new Date()
 * });
 */
export function useChartData(options: UseChartDataOptions): UseChartDataReturn {
  const { chartType, birthDetails, selectedDate } = options;

  const [zodiacNumber, setZodiacNumber] = useState<number | undefined>(undefined);
  const [planetSigns, setPlanetSigns] = useState<PlanetSign[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  /**
   * Fetches chart data based on chart type
   */
  const fetchChartData = useCallback(async () => {
    if (!birthDetails) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let data;
      switch (chartType) {
        case 'rasi':
          data = await getBirthChartData(birthDetails);
          break;
        case 'navamsa':
          data = await getNavamsaChartData(birthDetails);
          break;
        case 'thathkala':
          data = await getThathkalaChartData(birthDetails, selectedDate);
          break;
        default:
          throw new Error(`Unknown chart type: ${chartType}`);
      }

      setZodiacNumber(data.zodiacNumber);
      setPlanetSigns(data.planetSigns);
    } catch (err) {
      const errorMessage =
        err instanceof BirthChartApiError
          ? err.message
          : `Failed to load ${chartType} chart. Please try again.`;
      setError(errorMessage);
      setZodiacNumber(undefined);
      setPlanetSigns(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [
    birthDetails,
    chartType,
    // Only include selectedDate for thathkala chart type
    ...(chartType === 'thathkala' ? [selectedDate] : []),
  ]);

  /**
   * Effect to fetch chart data when dependencies change
   */
  useEffect(() => {
    void fetchChartData();
  }, [fetchChartData, retryCount]);

  /**
   * Retry function to manually trigger a refetch
   */
  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  return {
    zodiacNumber,
    planetSigns,
    isLoading,
    error,
    retry,
  };
}
