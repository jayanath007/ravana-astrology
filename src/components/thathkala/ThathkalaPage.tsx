import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThathkalaChart } from "@/components/division-charts/ThathkalaChart";
import { PlanetSignChangesTable } from "@/components/division-charts/PlanetSignChangesTable";
import { saveBirthDetails, loadBirthDetails } from "@/utils/sessionStorage";
import { TimelinePlayControls } from "@/components/dasha/TimelinePlayControls";
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

  // State for selected date (default to current date and time)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
      className="container mx-auto p-4 min-h-screen"
      role="main"
      aria-label="Thathkala Chart Page"
    >

      {/* Timeline Duration and Controls */}
      <div className="flex flex-col items-end justify-center mb-6">
        <TimelinePlayControls
          selectedDate={selectedDate}
          onDateTimeChange={setSelectedDate}
          className="mt-4"
        />
      </div>


      {/* Two Column Layout - Table takes minimum space, Chart takes maximum */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 mb-8">
        {/* Left Column - Planet Sign Changes Table (Minimum Width) */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700 lg:max-w-md">
          <PlanetSignChangesTable
            planetSigns={chartData.planetSigns}
            isLoading={chartData.isLoading}
          />
        </div>

        {/* Right Column - Thathkala Chart (Maximum Width) */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700">
          <ThathkalaChart
            birthDetails={birthDetails}
            selectedDate={debouncedSelectedDate}
          />
        </div>
      </div>
    </main>
  );
}
