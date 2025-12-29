import { ChartContainer } from './ChartContainer';
import { useChartData } from '@/hooks/useChartData';
import type { BirthDetails } from '@/types/birthChart';
import { PlanetSignChangesTable } from './PlanetSignChangesTable';

/**
 * Props for the ThathkalaChart component
 */
interface ThathkalaChartProps {
  birthDetails: BirthDetails | null;
  selectedDate?: Date;
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
  title = 'ගෝචරය',
  ariaLabel = 'Thathkala divisional chart showing birth ascendant with current time planetary positions',
}: ThathkalaChartProps) {
  const chartData = useChartData({
    chartType: 'thathkala',
    birthDetails,
    selectedDate,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Planet Sign Changes Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700">
        <PlanetSignChangesTable
          planetSigns={chartData.planetSigns}
          isLoading={chartData.isLoading}
        />
      </div>

      {/* Right Column - Chart */}
      <div>
        <ChartContainer
          title={title}
          ariaLabel={ariaLabel}
          isLoading={chartData.isLoading}
          error={chartData.error}
          onRetry={chartData.retry}
          zodiacNumber={chartData.zodiacNumber}
          planetSigns={chartData.planetSigns}
        />
      </div>
    </div>
  );
}
