import {
  getPlanetColor,
  getPlanetNameSinhala,
} from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type {
  ParsedMahadasha,
  DashaPlanet,
} from "@/dashaApiIntegration/vimshottari-dasha.types";
import { MIN_SEGMENT_WIDTH_FOR_LABEL, Z_INDEX } from "./timeline.constants";

interface MahadashaSegmentsProps {
  mahadashaPeriods: ParsedMahadasha[];
  calculatePosition: (date: Date) => number;
}

/**
 * Renders colored segments for each Mahadasha period on the timeline
 */
export function MahadashaSegments({
  mahadashaPeriods,
  calculatePosition,
}: MahadashaSegmentsProps) {
  return (
    <>
      {mahadashaPeriods.map((mahadasha, index) => {
        const startPercent = calculatePosition(mahadasha.startDateLocal);
        const endPercent =
          index < mahadashaPeriods.length - 1
            ? calculatePosition(mahadashaPeriods[index + 1].startDateLocal)
            : 100;
        const widthPercent = endPercent - startPercent;
        const color = getPlanetColor(mahadasha.planet as DashaPlanet);
        const planetNameSinhala = getPlanetNameSinhala(mahadasha.planet);

        return (
          <div
            key={`segment-${index}`}
            className="absolute top-0 h-full transition-all pointer-events-none flex items-center justify-center rounded-md"
            style={{
              left: `${startPercent}%`,
              width: `${widthPercent}%`,
              background: `linear-gradient(to bottom, ${color}dd, ${color}aa)`,
              boxShadow: `inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.2)`,
              zIndex: Z_INDEX.SEGMENTS,
            }}
          >
            {/* Planet Name Label - only show if segment is wide enough */}
            {widthPercent > MIN_SEGMENT_WIDTH_FOR_LABEL && (
              <span
                className="text-lg font-extrabold px-2 truncate"
                style={{ color: color }}
              >
                {planetNameSinhala}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}
