import { ChartCard } from './ChartCard';
import type { BirthDetails } from '@/types/birthChart';

/**
 * Props for ChartCardList component
 */
interface ChartCardListProps {
  birthDetails: BirthDetails | null;
}

/**
 * ChartCardList component
 *
 * Displays a grid of three astrological charts:
 * - Navamsa Chart (D9): Divisional chart for spiritual analysis
 * - Rasi Chart (D1): Birth chart
 * - Thathkala (D3): Chart with birth ascendant and current time planets
 *
 * Each chart is self-contained and handles its own API calling and loading state.
 *
 * @param props - Component props
 * @returns A grid layout with three chart cards
 */
export function ChartCardList({ birthDetails }: ChartCardListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart 1 - Navamsa Chart (D9) */}
      <ChartCard
        title="නවංශකය"
        chartType="navamsa"
        birthDetails={birthDetails}
        ariaLabel="Navamsa divisional chart used for analyzing marriage, spiritual growth, and inner self"
      />

      {/* Chart 2 - Rasi Chart (D1) */}
      <ChartCard
        title="ලග්නය"
        chartType="rasi"
        birthDetails={birthDetails}
        ariaLabel="Rasi birth chart displaying ascendant and planetary positions at time of birth"
      />

      {/* Chart 3 - Thathkala (D3) */}
      <ChartCard
        title="ගෝචරය"
        chartType="thathkala"
        birthDetails={birthDetails}
        ariaLabel="Thathkala divisional chart showing birth ascendant with current time planetary positions"
      />
    </div>
  );
}
