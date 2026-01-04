import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThathkalaChart } from "@/components/division-charts/ThathkalaChart";
import { PlanetSignChangesTable } from "@/components/division-charts/PlanetSignChangesTable";
import { ThathkalaFilterControls } from "@/components/thathkala/ThathkalaFilterControls";
import { ThathkalaTimeline } from "@/components/thathkala/ThathkalaTimeline";
import { AdaDawasa } from "@/components/thathkala/AdaDawasa";
import { saveBirthDetails, loadBirthDetails } from "@/utils/sessionStorage";
import type { BirthDetails } from "@/types/birthChart";
import { useDebounce } from "@/hooks/useDebounce";
import { useChartData } from "@/hooks/useChartData";

/**
 * Props for ThathkalaPage component
 */
interface ThathkalaPageProps {
  birthDetails?: BirthDetails;
}

/**
 * Thathkala Page component
 *
 * Displays a dedicated page for the Thathkala chart (D3) with timeline controls.
 * The Thathkala chart shows the birth ascendant with current time planetary positions,
 * allowing users to analyze how current planetary transits interact with their birth chart.
 *
 * Features:
 * - Interactive timeline controls for selecting date/time
 * - Full-width Thathkala chart
 *
 * Supports data from props, location state, or sessionStorage (in that priority order).
 * Implements accessibility features and error handling best practices.
 *
 * @param props - Component props (optional, falls back to location state)
 */
export function ThathkalaPage({
  birthDetails: propBirthDetails,
}: ThathkalaPageProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();

  // State for filter controls
  const [selectedZodiac, setSelectedZodiac] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();
    // Set to first day of next month at midnight
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  // State for selected date (default to first day of next month, same as startDate)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    // Set to first day of next month at midnight
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [endDate, setEndDate] = useState<Date>(() => {
    const now = new Date();
    // Create a date for the first day of the month after next month
    // Then set day to 0 to get the last day of next month
    const lastDayOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 2, // Month after next month
      0, // Day 0 = last day of previous month (which is next month)
      23,
      59,
      59,
      999
    );
    return lastDayOfNextMonth;
  });

  // Debounce selectedDate for chart updates (300ms delay)
  const debouncedSelectedDate = useDebounce(selectedDate, 300);

  // Data source priority: props → location state → sessionStorage
  const savedDetails = loadBirthDetails();
  const birthDetails =
    propBirthDetails ?? location.state?.birthDetails ?? savedDetails;

  // Fetch chart data for the table
  const chartData = useChartData({
    chartType: 'thathkala',
    birthDetails,
    selectedDate: debouncedSelectedDate,
  });

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
      className="container mx-auto p-2 min-h-screen"
      role="main"
      aria-label="Thathkala Chart Page"
    >
      {/* Three Column Layout - Controls, Chart (Maximum), Table */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,auto)_1fr_minmax(300px,400px)] gap-2 mb-2">
        {/* Left Column - Filter Controls and Date Picker */}
        <div className="flex flex-col gap-2">
          {/* Ada Dawasa Date/Time Picker */}
          <AdaDawasa
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />

          {/* Filter Controls */}
          <ThathkalaFilterControls
            selectedZodiac={selectedZodiac}
            startDate={startDate}
            endDate={endDate}
            onZodiacChange={setSelectedZodiac}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        {/* Middle Column - Thathkala Chart (Maximum Width - Priority) */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700">
          <ThathkalaChart
            birthDetails={birthDetails}
            selectedDate={debouncedSelectedDate}
            zodiacNumber={selectedZodiac}
          />
        </div>

        {/* Right Column - Planet Sign Changes Table (Compact Width) */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700 lg:max-w-md">
          <PlanetSignChangesTable
            planetSigns={chartData.planetSigns}
            isLoading={chartData.isLoading}
          />
        </div>
      </div>

      {/* Timeline Controller - Full Width at Bottom */}
      <div>
        <ThathkalaTimeline
          startDate={startDate}
          endDate={endDate}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
    </main>
  );
}
