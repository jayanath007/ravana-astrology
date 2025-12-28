import { RasiChart } from './RasiChart';
import { NavamsaChart } from './NavamsaChart';
import { ThathkalaChart } from './ThathkalaChart';
import type { BirthDetails } from '@/types/birthChart';

/**
 * Props for ChartCardList component
 */
interface ChartCardListProps {
  birthDetails: BirthDetails | null;
  selectedDate?: Date;
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
export function ChartCardList({ birthDetails, selectedDate }: ChartCardListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart 1 - Navamsa Chart (D9) */}
      <NavamsaChart birthDetails={birthDetails} />

      {/* Chart 2 - Rasi Chart (D1) */}
      <RasiChart birthDetails={birthDetails} />

      {/* Chart 3 - Thathkala (D3) */}
      <ThathkalaChart birthDetails={birthDetails} selectedDate={selectedDate} />
    </div>
  );
}
