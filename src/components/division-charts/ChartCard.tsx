import { useEffect, useState, useCallback } from 'react';
import { AstrologicalGrid } from '@/components/astrological-grid/AstrologicalGrid';
import type { PlanetSign, BirthDetails } from '@/types/birthChart';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';
import {
  getBirthChartData,
  getNavamsaChartData,
  getThathkalaChartData,
  BirthChartApiError,
} from '@/services/birthChartService';

/**
 * Supported chart types
 */
export type ChartType = 'rasi' | 'navamsa' | 'thathkala';

/**
 * Props for the ChartCard component
 */
interface ChartCardProps {
  title: string;
  chartType: ChartType;
  birthDetails: BirthDetails | null;
  ariaLabel: string;
}

/**
 * Self-contained chart card component that fetches and displays an astrological chart.
 * Handles its own API calling, loading state, and error management.
 *
 * @param props - Component props
 * @returns A chart card with appropriate state rendering
 *
 * @example
 * <ChartCard
 *   title="Navamsa Chart (D9)"
 *   chartType="navamsa"
 *   birthDetails={birthDetails}
 *   ariaLabel="Navamsa divisional chart for spiritual analysis"
 * />
 */
export function ChartCard({
  title,
  chartType,
  birthDetails,
  ariaLabel,
}: ChartCardProps) {
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
          data = await getThathkalaChartData(birthDetails);
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
          : `Failed to load ${title}. Please try again.`;
      setError(errorMessage);
      setZodiacNumber(undefined);
      setPlanetSigns(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [birthDetails, chartType, title]);

  /**
   * Effect to fetch chart data when dependencies change
   */
  useEffect(() => {
    void fetchChartData();
  }, [fetchChartData, retryCount]);

  /**
   * Retry handler
   */
  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);
  return (
    <section aria-label={ariaLabel} className="flex flex-col">
      <div className="flex-1" aria-busy={isLoading}>
        {isLoading ? (
          <div
            className="flex items-center justify-center h-64 text-neutral-600 dark:text-neutral-400"
            role="status"
            aria-live="polite"
          >
            Loading {title}...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div
              className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm"
              role="alert"
            >
              <p className="mb-2">{error}</p>
              <button
                onClick={handleRetry}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
                aria-label={`Retry loading ${title}`}
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <AstrologicalGrid
            zodiacNumber={zodiacNumber}
            planetSigns={planetSigns}
            showBackButton={false}
            title={title}
          />
        )}
      </div>
    </section>
  );
}
