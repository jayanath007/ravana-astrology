import { formatSinhalaDateTime } from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type { ParsedMahadasha } from "@/dashaApiIntegration/vimshottari-dasha.types";

interface TimelineLabelsProps {
  mahadashaPeriods: ParsedMahadasha[];
}

/**
 * Displays start and end date labels for the timeline
 */
export function TimelineLabels({ mahadashaPeriods }: TimelineLabelsProps) {
  if (mahadashaPeriods.length === 0) {
    return null;
  }

  const firstPeriod = mahadashaPeriods[0];
  const lastPeriod = mahadashaPeriods[mahadashaPeriods.length - 1];

  return (
    <div className="flex justify-between text-sm px-1">
      {/* First Mahadasha Start */}
      <div className="flex flex-col items-start">
        <span className="text-neutral-800 dark:text-neutral-200 text-base">
          ආරම්භය {formatSinhalaDateTime(firstPeriod.startDateLocal, "short")}
        </span>
      </div>

      {/* Last Mahadasha End */}
      <div className="flex flex-col items-end">
        <span className="text-neutral-800 dark:text-neutral-200 text-base">
          අවසානය {formatSinhalaDateTime(lastPeriod.endDateLocal, "short")}
        </span>
      </div>
    </div>
  );
}
