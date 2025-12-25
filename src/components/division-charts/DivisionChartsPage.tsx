import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChartCard } from "./ChartCard";
import { useDivisionChart } from "@/hooks/useDivisionChart";
import { saveBirthDetails, loadBirthDetails } from "@/utils/sessionStorage";
import type { PlanetSign, BirthDetails } from "@/types/birthChart";
import { TAILWIND_CLASSES } from "@/styles/theme-colors";

/**
 * Props for DivisionChartsPage component
 */
interface DivisionChartsPageProps {
  birthDetails?: BirthDetails;
  rasiChartData?: {
    zodiacNumber: number;
    planetSigns: PlanetSign[];
  };
}

/**
 * Division Charts Page component
 *
 * Displays three astrological charts side by side:
 * - Rasi Chart (D1): Birth chart
 * - Navamsa Chart (D9): Divisional chart for spiritual analysis
 * - Thathkala (D3): Chart with birth ascendant and current time planets
 *
 * Supports data from props, location state, or sessionStorage (in that priority order).
 * Implements accessibility features and error handling best practices.
 *
 * @param props - Component props (optional, falls back to location state)
 */
export function DivisionChartsPage({
  birthDetails: propBirthDetails,
  rasiChartData: propRasiData,
}: DivisionChartsPageProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Data source priority: props → location state → sessionStorage
  const savedDetails = loadBirthDetails();
  const birthDetails =
    propBirthDetails ?? location.state?.birthDetails ?? savedDetails;

  const rasiZodiacNumber =
    propRasiData?.zodiacNumber ??
    (location.state?.zodiacNumber as number | undefined);

  const rasiPlanetSigns =
    propRasiData?.planetSigns ??
    (location.state?.planetSigns as PlanetSign[] | undefined);

  // Save birth details to sessionStorage for persistence on refresh
  useEffect(() => {
    if (birthDetails) {
      saveBirthDetails(birthDetails);
    }
  }, [birthDetails]);

  // Redirect to home if no birth details available
  useEffect(() => {
    if (!birthDetails && !rasiZodiacNumber) {
      navigate("/", {
        state: {
          error: "Birth details required. Please enter your birth information.",
        },
      });
    }
  }, [birthDetails, rasiZodiacNumber, navigate]);

  // Fetch Navamsa chart data using custom hook
  const navamsa = useDivisionChart({
    birthDetails,
    chartType: "navamsa",
    enabled: !!birthDetails,
  });

  // Fetch Thathkala (D3) chart data using custom hook
  const thathkala = useDivisionChart({
    birthDetails,
    chartType: "thathkala",
    enabled: !!birthDetails,
  });

  return (
    <main
      className="container mx-auto p-4 min-h-screen"
      role="main"
      aria-label="Division Charts Page"
    >
      {/* Screen reader announcement for loading states */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {navamsa.isLoading || thathkala.isLoading
          ? "Loading division charts..."
          : "Division charts loaded"}
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className={`px-4 py-2 font-medium rounded-md transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
          aria-label="Back to birth details input"
        >
          ← Back to Input
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100">
        Division Charts
      </h1>

      {/* Three Charts Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 2 - Navamsa Chart (D9) */}
        <ChartCard
          title="නවංශකය"
          zodiacNumber={navamsa.zodiacNumber}
          planetSigns={navamsa.planetSigns}
          isLoading={navamsa.isLoading}
          error={navamsa.error}
          onRetry={navamsa.retry}
          ariaLabel="Navamsa divisional chart used for analyzing marriage, spiritual growth, and inner self"
        />

        {/* Chart 1 - Rasi Chart (D1) */}
        <ChartCard
          title="ලග්නය"
          zodiacNumber={rasiZodiacNumber}
          planetSigns={rasiPlanetSigns}
          isLoading={false}
          error={null}
          ariaLabel="Rasi birth chart displaying ascendant and planetary positions at time of birth"
        />

        {/* Chart 3 - Thathkala (D3) */}
        <ChartCard
          title="තත්කාල"
          zodiacNumber={thathkala.zodiacNumber}
          planetSigns={thathkala.planetSigns}
          isLoading={thathkala.isLoading}
          error={thathkala.error}
          onRetry={thathkala.retry}
          ariaLabel="Thathkala divisional chart showing birth ascendant with current time planetary positions"
        />
      </div>
    </main>
  );
}
