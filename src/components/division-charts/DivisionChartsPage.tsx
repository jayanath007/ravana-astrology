import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChartCardList } from "./ChartCardList";
import { saveBirthDetails, loadBirthDetails } from "@/utils/sessionStorage";
import { TimelinePlayControls } from "@/components/dasha/TimelinePlayControls";
import { DashaTimelineControl } from "@/components/dasha/DashaTimelineControl";
import type { SelectedDatePeriods } from "@/components/dasha/DashaTimelineControl";
import { DatePeriodDisplay } from "@/components/dasha/DatePeriodDisplay";
import { DashaLevel } from "@/dashaApiIntegration/vimshottari-dasha.types";
import type { BirthDetails } from "@/types/birthChart";

/**
 * Props for DivisionChartsPage component
 */
interface DivisionChartsPageProps {
  birthDetails?: BirthDetails;
}

/**
 * Division Charts Page component
 *
 * Displays three astrological charts side by side:
 * - Rasi Chart (D1): Birth chart
 * - Navamsa Chart (D9): Divisional chart for spiritual analysis
 * - Thathkala (D3): Chart with birth ascendant and current time planets
 *
 * Each ChartCard is self-contained and handles its own API calling and loading state.
 * Supports data from props, location state, or sessionStorage (in that priority order).
 * Implements accessibility features and error handling best practices.
 *
 * @param props - Component props (optional, falls back to location state)
 */
export function DivisionChartsPage({
  birthDetails: propBirthDetails,
}: DivisionChartsPageProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();

  // State for selected date (default to current date and time)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // State for storing calculated dasha periods
  const [selectedDatePeriods, setSelectedDatePeriods] = useState<SelectedDatePeriods | null>(null);

  // Data source priority: props → location state → sessionStorage
  const savedDetails = loadBirthDetails();
  const birthDetails =
    propBirthDetails ?? location.state?.birthDetails ?? savedDetails;

  // Save birth details to sessionStorage for persistence on refresh
  useEffect(() => {
    if (birthDetails) {
      saveBirthDetails(birthDetails);
    }
  }, [birthDetails]);

  // Redirect to home if no birth details available
  useEffect(() => {
    if (!birthDetails) {
      navigate("/", {
        state: {
          error: "Birth details required. Please enter your birth information.",
        },
      });
    }
  }, [birthDetails, navigate]);

  return (
    <main
      className="container mx-auto p-4 min-h-screen"
      role="main"
      aria-label="Division Charts Page"
    >
      {/* Timeline Duration and Controls */}
      <div className="flex flex-col items-end justify-center mb-6">
        <TimelinePlayControls
          selectedDate={selectedDate}
          onDateTimeChange={setSelectedDate}
          className="mt-4"
        />
      </div>


      {/* Display periods for selected date */}
      {selectedDatePeriods && (
        <div className="mb-6">
          <DatePeriodDisplay
            selectedDate={selectedDate}
            mahadasha={selectedDatePeriods.mahadasha}
            antardasha={selectedDatePeriods.antardasha}
            pratyantardasha={selectedDatePeriods.pratyantardasha}
            sookshma={selectedDatePeriods.sookshma}
          />
        </div>
      )}

      {/* Three Charts Grid Layout */}
      <ChartCardList birthDetails={birthDetails} selectedDate={selectedDate} />



      {/* Timeline with markers */}
      <DashaTimelineControl
        birthDetails={birthDetails}
        detailLevel={DashaLevel.Sookshma}
        yearsToCalculate={120}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onPeriodsCalculated={setSelectedDatePeriods}
      />
    </main>
  );
}
