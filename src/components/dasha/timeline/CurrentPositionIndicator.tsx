import {
  getPlanetColor,
  getPlanetNameSinhala,
  formatSinhalaDateTime,
} from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type {
  ParsedMahadasha,
  DashaPlanet,
} from "@/dashaApiIntegration/vimshottari-dasha.types";
import { Z_INDEX } from "./timeline.constants";

interface CurrentPositionIndicatorProps {
  currentPosition: number;
  selectedDate: Date;
  activeMahadasha: ParsedMahadasha | undefined;
}

/**
 * Renders the current position indicator line with date/mahadasha label
 */
export function CurrentPositionIndicator({
  currentPosition,
  selectedDate,
  activeMahadasha,
}: CurrentPositionIndicatorProps) {
  return (
    <div
      className="absolute top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-purple-700 pointer-events-none shadow-lg"
      style={{
        left: `${currentPosition}%`,
        boxShadow: "0 0 8px rgba(19, 143, 40, 0.6), 0 2px 6px rgba(0,0,0,0.3)",
        zIndex: Z_INDEX.POSITION_INDICATOR,
      }}
    >
      {/* Date and Mahadasha Label on Right-Bottom Side */}
      <div className="absolute top-full mt-2 left-4 whitespace-nowrap">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-100 dark:to-gray-200 text-gray-900 dark:text-gray-950 text-sm px-3 py-2 rounded-lg shadow-2xl border border-purple-400 relative">
          {/* Arrow pointing up-left */}
          <div
            className="absolute -top-2 left-2 w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: "6px solid rgb(255, 255, 255)",
            }}
          />
          {activeMahadasha && (
            <div
              className="font-extrabold mb-0.5"
              style={{
                color: getPlanetColor(activeMahadasha.planet as DashaPlanet),
              }}
            >
              {getPlanetNameSinhala(activeMahadasha.planet)} මහදාශාව
            </div>
          )}
          <div className="text-gray-800 dark:text-gray-950">{formatSinhalaDateTime(selectedDate, "long")}</div>
        </div>
      </div>
    </div>
  );
}
