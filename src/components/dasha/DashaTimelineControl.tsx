import { Slider } from "@/components/ui/slider";
import type { ParsedMahadasha } from "@/dashaApiIntegration/vimshottari-dasha.types";
import { TimelinePlayControls } from "./TimelinePlayControls";
import { DatePeriodDisplay } from "./DatePeriodDisplay";
import { useTimelineCalculations } from "@/hooks/useTimelineCalculations";
import { MahadashaSegments } from "./timeline/MahadashaSegments";
import { MahadashaDividers } from "./timeline/MahadashaDividers";
import { CurrentPositionIndicator } from "./timeline/CurrentPositionIndicator";
import { TimelineLabels } from "./timeline/TimelineLabels";
import { SLIDER_CONFIG, Z_INDEX } from "./timeline/timeline.constants";

interface DashaTimelineControlProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  mahadashaPeriods: ParsedMahadasha[];
  birthDate: Date;
}

export function DashaTimelineControl({
  selectedDate,
  setSelectedDate,
  mahadashaPeriods,
  birthDate,
}: DashaTimelineControlProps) {
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

  return (
    <div className="w-full space-y-4">
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
