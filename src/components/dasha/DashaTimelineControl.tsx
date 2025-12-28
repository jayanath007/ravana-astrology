import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import type { DashaLevel } from "@/dashaApiIntegration/vimshottari-dasha.types";
import type { BirthDetails } from "@/types/birthChart";
import { useVimshottariDasha } from "@/hooks/useVimshottariDasha";
import { DatePeriodDisplay } from "./DatePeriodDisplay";
import { TimelinePlayControls } from "./TimelinePlayControls";
import { useTimelineCalculations } from "@/hooks/useTimelineCalculations";
import { MahadashaSegments } from "./timeline/MahadashaSegments";
import { MahadashaDividers } from "./timeline/MahadashaDividers";
import { CurrentPositionIndicator } from "./timeline/CurrentPositionIndicator";
import { TimelineLabels } from "./timeline/TimelineLabels";
import { SLIDER_CONFIG, Z_INDEX } from "./timeline/timeline.constants";
import { TAILWIND_CLASSES } from "@/styles/theme-colors";

/**
 * Props for the DashaTimelineControl component
 */
interface DashaTimelineControlProps {
  /** Birth details for dasha calculation */
  birthDetails: BirthDetails | null;
  /** Detail level for dasha calculation (1-4). Default: 4 (Sookshma) */
  detailLevel?: DashaLevel;
  /** Number of years to calculate from birth (1-120). Default: 120 */
  yearsToCalculate?: number;
}

/**
 * Self-contained Dasha Timeline Control component.
 * Handles its own API calling, loading state, and error management.
 *
 * @param props - Component props
 * @returns Timeline control with loading/error states or interactive timeline
 *
 * @example
 * <DashaTimelineControl
 *   birthDetails={birthDetails}
 *   detailLevel={4}
 *   yearsToCalculate={120}
 * />
 */
export function DashaTimelineControl({
  birthDetails,
  detailLevel = 4, // Sookshma level by default
  yearsToCalculate = 120,
}: DashaTimelineControlProps) {
  // Internal state for selected date
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Fetch dasha data using custom hook
  const { data, isLoading, error, retry } = useVimshottariDasha({
    birthDetails: birthDetails ?? undefined,
    detailLevel,
    yearsToCalculate,
    enabled: !!birthDetails,
  });

  // Extract data from hook response
  const mahadashaPeriods = data?.mahadashaPeriods ?? [];
  const birthDate = birthDetails ? new Date(birthDetails.birthDate) : new Date();

  // Use custom hook for all calculations
  const {
    timelineBounds,
    currentPosition,
    calculatePosition,
    sliderValueToDate,
    activeMahadasha,
    selectedDatePeriods,
  } = useTimelineCalculations({
    birthDate,
    selectedDate,
    mahadashaPeriods,
  });

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const newDate = sliderValueToDate(values[0]);

    // Validate date is within bounds
    if (
      newDate >= timelineBounds.birthDate &&
      newDate <= timelineBounds.endDate
    ) {
      setSelectedDate(newDate);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-64 text-neutral-600 dark:text-neutral-400"
        role="status"
        aria-live="polite"
      >
        Calculating Vimshottari Dasha...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm"
          role="alert"
        >
          <p className="mb-2">{error}</p>
          <button
            onClick={retry}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
            aria-label="Retry loading dasha timeline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || mahadashaPeriods.length === 0) {
    return (
      <div
        className="flex items-center justify-center h-64 text-neutral-600 dark:text-neutral-400"
        role="status"
      >
        No dasha data available
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Date/Time Picker Controls */}
      <div className="flex flex-col items-end justify-center">
        <TimelinePlayControls
          selectedDate={selectedDate}
          onDateTimeChange={setSelectedDate}
          className="mt-4"
        />
      </div>

      {/* Timeline Container */}
      <div className="relative w-full">
        {/* Display periods for selected date */}
        {selectedDatePeriods && (
          <div className="mb-3">
            <DatePeriodDisplay
              selectedDate={selectedDate}
              mahadasha={selectedDatePeriods.mahadasha}
              antardasha={selectedDatePeriods.antardasha}
              pratyantardasha={selectedDatePeriods.pratyantardasha}
              sookshma={selectedDatePeriods.sookshma}
            />
          </div>
        )}

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
    </div>
  );
}
