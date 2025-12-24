import { useState, useEffect, useCallback } from 'react';
import {
  getNavamsaChartData,
  getThathkaalaKendraChartData,
} from '@/services/birthChartService';
import type { BirthDetails, PlanetSign } from '@/types/birthChart';

/**
 * Options for the useDivisionChart hook
 */
interface UseDivisionChartOptions {
  birthDetails: BirthDetails | undefined;
  chartType: 'navamsa' | 'thathkaalaKendra';
  enabled?: boolean;
}

/**
 * Return type for the useDivisionChart hook
 */
interface UseDivisionChartReturn {
  zodiacNumber: number | undefined;
  planetSigns: PlanetSign[] | undefined;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

/**
 * Custom hook for fetching division chart data
 *
 * @param options - Configuration for chart fetching
 * @param options.birthDetails - Birth details for calculation
 * @param options.chartType - Type of division chart ('navamsa' | 'thathkaalaKendra')
 * @param options.enabled - Whether to fetch data (default: true)
 *
 * @returns Chart data with loading and error states, plus a retry function
 *
 * @example
 * const navamsa = useDivisionChart({
 *   birthDetails,
 *   chartType: 'navamsa',
 *   enabled: !!birthDetails
 * });
 *
 * if (navamsa.isLoading) return <div>Loading...</div>;
 * if (navamsa.error) return <div>{navamsa.error} <button onClick={navamsa.retry}>Retry</button></div>;
 * return <Chart zodiacNumber={navamsa.zodiacNumber} planetSigns={navamsa.planetSigns} />;
 */
export function useDivisionChart(
  options: UseDivisionChartOptions
): UseDivisionChartReturn {
  const { birthDetails, chartType, enabled = true } = options;

  const [zodiacNumber, setZodiacNumber] = useState<number | undefined>();
  const [planetSigns, setPlanetSigns] = useState<PlanetSign[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchChartData = useCallback(async () => {
    if (!birthDetails || !enabled) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Select the appropriate fetch function based on chart type
      const fetchFn =
        chartType === 'navamsa'
          ? getNavamsaChartData
          : getThathkaalaKendraChartData;

      // Fetch chart data
      const { zodiacNumber: fetchedZodiacNumber, planetSigns: fetchedPlanetSigns } =
        await fetchFn(birthDetails);

      setZodiacNumber(fetchedZodiacNumber);
      setPlanetSigns(fetchedPlanetSigns);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to fetch ${chartType === 'navamsa' ? 'Navamsa' : 'Thathkaala Kendra'} chart`;
      setError(errorMessage);
      console.error(`Error fetching ${chartType} chart:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [birthDetails, chartType, enabled]);

  // Effect to fetch chart data when dependencies change
  useEffect(() => {
    fetchChartData();
  }, [fetchChartData, retryCount]);

  // Retry function to manually trigger a refetch
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
