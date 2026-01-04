import { useRef, useEffect } from 'react';
import { ChartContainer } from './ChartContainer';
import { useChartData } from '@/hooks/useChartData';
import type { BirthDetails } from '@/types/birthChart';

/**
 * Props for the ThathkalaChart component
 */
interface ThathkalaChartProps {
  birthDetails: BirthDetails | null;
  selectedDate?: Date;
  zodiacNumber?: number;
  title?: string;
  ariaLabel?: string;
}

/**
 * Thathkala Chart Component (D3 - Transit Chart)
 *
 * Displays a chart showing the birth ascendant with current time planetary positions.
 * This chart helps analyze how current planetary transits interact with the birth chart.
 *
 * Note: The selectedDate should be debounced by the parent component if it changes
 * frequently (e.g., during timeline scrubbing). See DivisionChartsPage.tsx:44 for example.
 *
 * @param props - Component props
 * @param props.birthDetails - Birth details for chart calculation
 * @param props.selectedDate - Date for current planetary positions (optional, defaults to birth time)
 * @param props.title - Chart title (default: "ගෝචරය")
 * @param props.ariaLabel - Accessibility label (default: descriptive label)
 *
 * @returns A self-contained Thathkala chart component
 *
 * @example
 * <ThathkalaChart birthDetails={birthDetails} />
 *
 * @example
 * // With debounced date from timeline controls
 * const debouncedDate = useDebounce(selectedDate, 300);
 * <ThathkalaChart
 *   birthDetails={birthDetails}
 *   selectedDate={debouncedDate}
 * />
 */
export function ThathkalaChart({
  birthDetails,
  selectedDate,
  zodiacNumber: propsZodiacNumber,
  title = 'ගෝචරය',
  ariaLabel = 'Thathkala divisional chart showing birth ascendant with current time planetary positions',
}: ThathkalaChartProps) {
  const chartData = useChartData({
    chartType: 'thathkala',
    birthDetails,
    selectedDate,
  });

  // Track if we have loaded data at least once
  // This prevents showing loading indicator on date changes
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    if (chartData.planetSigns && chartData.planetSigns.length > 0) {
      hasLoadedOnce.current = true;
    }
  }, [chartData.planetSigns]);

  // Use provided zodiacNumber prop if available, otherwise use from chartData
  const zodiacNumber = propsZodiacNumber ?? chartData.zodiacNumber;

  // Only show loading on first load, not on date changes
  const shouldShowLoading = chartData.isLoading && !hasLoadedOnce.current;

  return (
    <ChartContainer
      title={title}
      ariaLabel={ariaLabel}
      isLoading={shouldShowLoading}
      error={chartData.error}
      onRetry={chartData.retry}
      zodiacNumber={zodiacNumber}
      planetSigns={chartData.planetSigns}
    />
  );
}
