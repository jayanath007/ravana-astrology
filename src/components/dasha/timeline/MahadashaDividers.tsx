import {
  getPlanetColor,
  getPlanetNameSinhala,
  formatSinhalaDateTime,
} from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type {
  ParsedMahadasha,
  DashaPlanet,
} from "@/dashaApiIntegration/vimshottari-dasha.types";
import { DIVIDER_CONFIG, Z_INDEX, TOOLTIP_CONFIG } from "./timeline.constants";

interface MahadashaDividersProps {
  mahadashaPeriods: ParsedMahadasha[];
  calculatePosition: (date: Date) => number;
}

/**
 * Renders divider markers with hover tooltips at Mahadasha boundaries
 */
export function MahadashaDividers({
  mahadashaPeriods,
  calculatePosition,
}: MahadashaDividersProps) {
  return (
    <>
      {mahadashaPeriods.map((mahadasha, index) => {
        const positionPercent = calculatePosition(mahadasha.startDateLocal);
        const color = getPlanetColor(mahadasha.planet as DashaPlanet);
        const planetNameSinhala = getPlanetNameSinhala(mahadasha.planet);
        const formattedDateTime = formatSinhalaDateTime(
          mahadasha.startDateLocal,
          "long"
        );

        return (
          <div
            key={`divider-${index}`}
            className="absolute top-0 h-full transition-all cursor-pointer group"
            style={{
              left: `${positionPercent}%`,
              width: DIVIDER_CONFIG.WIDTH,
              marginLeft: DIVIDER_CONFIG.MARGIN_LEFT,
              zIndex: Z_INDEX.DIVIDERS,
            }}
          >
            {/* Visible Line */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 group-hover:w-2 transition-all shadow-lg"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 4px ${color}88, 0 2px 4px rgba(0,0,0,0.3)`,
              }}
            />

            {/* Hover Tooltip */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
              style={{ zIndex: Z_INDEX.TOOLTIP }}
            >
              <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl">
                <div
                  className="font-extrabold text-center mb-1"
                  style={{ color: color }}
                >
                  {planetNameSinhala} මහදාශාව ආරම්භය
                </div>
                <div className="text-center">{formattedDateTime}</div>
              </div>
              {/* Arrow pointing down */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                style={{
                  borderLeft: `${TOOLTIP_CONFIG.ARROW_SIZE} solid transparent`,
                  borderRight: `${TOOLTIP_CONFIG.ARROW_SIZE} solid transparent`,
                  borderTop: `${TOOLTIP_CONFIG.ARROW_SIZE} solid ${TOOLTIP_CONFIG.BG_COLOR}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
