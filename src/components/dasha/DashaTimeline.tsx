import { Slider } from "@/components/ui/slider";
import { MahadashaSegments } from "./timeline/MahadashaSegments";
import { MahadashaDividers } from "./timeline/MahadashaDividers";
import { CurrentPositionIndicator } from "./timeline/CurrentPositionIndicator";
import { TimelineLabels } from "./timeline/TimelineLabels";
import { SLIDER_CONFIG, Z_INDEX } from "./timeline/timeline.constants";
import type { ParsedMahadasha } from "@/dashaApiIntegration/vimshottari-dasha.types";

/**
 * Props for the DashaTimeline component
 */
interface DashaTimelineProps {
  /** Mahadasha periods data */
  mahadashaPeriods: ParsedMahadasha[];
  /** Currently selected date on the timeline */
  selectedDate: Date;
  /** Callback when slider changes date */
  onDateChange: (date: Date) => void;
  /** Timeline bounds (birth date to end date) */
  timelineBounds: {
    birthDate: Date;
    endDate: Date;
  };
  /** Current position percentage (0-100) for slider */
  currentPosition: number;
  /** Function to calculate position percentage for any date */
  calculatePosition: (date: Date) => number;
  /** Function to convert slider value (0-100) to date */
  sliderValueToDate: (value: number) => Date;
  /** Active mahadasha period for current position */
  activeMahadasha: ParsedMahadasha | undefined;
}

/**
 * Pure presentation component for the Dasha timeline visualization.
 * Displays timeline track with segments, dividers, slider, position indicator, and labels.
 *
 * @param props - Component props
 * @returns Timeline visualization with interactive slider
 */
export function DashaTimeline({
  mahadashaPeriods,
  selectedDate,
  onDateChange,
  timelineBounds,
  currentPosition,
  calculatePosition,
  sliderValueToDate,
  activeMahadasha,
}: DashaTimelineProps) {
  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const newDate = sliderValueToDate(values[0]);

    // Validate date is within bounds
    if (
      newDate >= timelineBounds.birthDate &&
      newDate <= timelineBounds.endDate
    ) {
      onDateChange(newDate);
    }
  };

  return (
    <div className="relative w-full">
      {/* Timeline Track */}
      <div className="relative h-8 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-xl shadow-md border border-neutral-300 dark:border-neutral-600 overflow-visible">
        {/* Mahadasha Segments */}
        <MahadashaSegments
          mahadashaPeriods={mahadashaPeriods}
          calculatePosition={calculatePosition}
        />

        {/* Mahadasha Divider Markers */}
        <MahadashaDividers
          mahadashaPeriods={mahadashaPeriods}
          calculatePosition={calculatePosition}
        />

        {/* Slider Component */}
        <div
          className="absolute inset-0 flex items-center px-2 pointer-events-none"
          style={{ zIndex: Z_INDEX.SLIDER }}
        >
          <Slider
            value={[currentPosition]}
            onValueChange={handleSliderChange}
            max={SLIDER_CONFIG.MAX}
            step={SLIDER_CONFIG.STEP}
            className="w-full pointer-events-auto"
            aria-label="Dasha timeline: Select date"
            aria-valuetext={selectedDate.toLocaleDateString("si-LK")}
          />
        </div>

        {/* Current Position Indicator */}
        <CurrentPositionIndicator
          currentPosition={currentPosition}
          selectedDate={selectedDate}
          activeMahadasha={activeMahadasha}
        />
      </div>

      {/* Timeline Labels */}
      <TimelineLabels mahadashaPeriods={mahadashaPeriods} />
    </div>
  );
}
