import { ChartContainer } from './ChartContainer';
import { useChartData } from '@/hooks/useChartData';
import type { BirthDetails } from '@/types/birthChart';

/**
 * Props for the RasiChart component
 */
interface RasiChartProps {
  birthDetails: BirthDetails | null;
  title?: string;
  ariaLabel?: string;
}

/**
 * Rasi Chart Component (D1 - Birth Chart)
 *
 * Displays the primary birth chart showing ascendant and planetary positions
 * at the time of birth. This is the foundational chart in Vedic astrology.
 *
 * @param props - Component props
 * @param props.birthDetails - Birth details for chart calculation
 * @param props.title - Chart title (default: "ලග්නය")
 * @param props.ariaLabel - Accessibility label (default: descriptive label)
 *
 * @returns A self-contained Rasi chart component
 *
 * @example
 * <RasiChart birthDetails={birthDetails} />
 *
 * @example
 * <RasiChart
 *   birthDetails={birthDetails}
 *   title="Rasi Chart (D1)"
 *   ariaLabel="Custom label for screen readers"
 * />
 */
export function RasiChart({
  birthDetails,
  title = 'ලග්නය',
  ariaLabel = 'Rasi birth chart displaying ascendant and planetary positions at time of birth',
}: RasiChartProps) {
  const chartData = useChartData({
    chartType: 'rasi',
    birthDetails,
  });

  return (
    <ChartContainer
      title={title}
      ariaLabel={ariaLabel}
      isLoading={chartData.isLoading}
      error={chartData.error}
      onRetry={chartData.retry}
      zodiacNumber={chartData.zodiacNumber}
      planetSigns={chartData.planetSigns}
    />
  );
}
