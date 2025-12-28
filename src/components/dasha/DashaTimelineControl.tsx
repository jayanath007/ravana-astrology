import { useState } from "react";
import type { DashaLevel } from "@/dashaApiIntegration/vimshottari-dasha.types";
import type { BirthDetails } from "@/types/birthChart";
import { useVimshottariDasha } from "@/hooks/useVimshottariDasha";
import { DatePeriodDisplay } from "./DatePeriodDisplay";
import { DashaTimeline } from "./DashaTimeline";
import { useTimelineCalculations } from "@/hooks/useTimelineCalculations";
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
  /** Optional controlled selected date (for external control) */
  selectedDate?: Date;
  /** Optional callback when selected date changes (for external control) */
  onDateChange?: (date: Date) => void;
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
  selectedDate: controlledSelectedDate,
  onDateChange,
}: DashaTimelineControlProps) {
  // Internal state for selected date (used when not controlled)
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date>(new Date());

  // Use controlled date if provided, otherwise use internal state
  const selectedDate = controlledSelectedDate ?? internalSelectedDate;
  const setSelectedDate = onDateChange ?? setInternalSelectedDate;

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
    <div className="w-full">
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

        {/* DashaTimeline Component */}
        <DashaTimeline
          mahadashaPeriods={mahadashaPeriods}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          timelineBounds={timelineBounds}
          currentPosition={currentPosition}
          calculatePosition={calculatePosition}
          sliderValueToDate={sliderValueToDate}
          activeMahadasha={activeMahadasha}
        />
      </div>
    </div>
  );
}
