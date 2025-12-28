import { ChartContainer } from './ChartContainer';
import { useChartData } from '@/hooks/useChartData';
import type { BirthDetails } from '@/types/birthChart';

/**
 * Props for the NavamsaChart component
 */
interface NavamsaChartProps {
  birthDetails: BirthDetails | null;
  title?: string;
  ariaLabel?: string;
}

/**
 * Navamsa Chart Component (D9 - Divisional Chart)
 *
 * Displays the Navamsa divisional chart used for analyzing marriage,
 * spiritual growth, and the inner self. This is one of the most important
 * divisional charts in Vedic astrology.
 *
 * @param props - Component props
 * @param props.birthDetails - Birth details for chart calculation
 * @param props.title - Chart title (default: "නවංශකය")
 * @param props.ariaLabel - Accessibility label (default: descriptive label)
 *
 * @returns A self-contained Navamsa chart component
 *
 * @example
 * <NavamsaChart birthDetails={birthDetails} />
 *
 * @example
 * <NavamsaChart
 *   birthDetails={birthDetails}
 *   title="Navamsa Chart (D9)"
 *   ariaLabel="Custom label for screen readers"
 * />
 */
export function NavamsaChart({
  birthDetails,
  title = 'නවංශකය',
  ariaLabel = 'Navamsa divisional chart used for analyzing marriage, spiritual growth, and inner self',
}: NavamsaChartProps) {
  const chartData = useChartData({
    chartType: 'navamsa',
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
