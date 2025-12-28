import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChartCardList } from "./ChartCardList";
import { saveBirthDetails, loadBirthDetails } from "@/utils/sessionStorage";
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

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100">
        Division Charts
      </h1>

      {/* Three Charts Grid Layout */}
      <ChartCardList birthDetails={birthDetails} />
    </main>
  );
}
