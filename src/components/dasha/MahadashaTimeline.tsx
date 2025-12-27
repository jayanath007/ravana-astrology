import {
  formatDateRange,
  formatDuration,
  getPlanetColor,
} from '@/dashaApiIntegration/vimshottari-dasha.utils';
import type {
  ParsedMahadasha,
  DashaPlanet,
} from '@/dashaApiIntegration/vimshottari-dasha.types';

interface MahadashaTimelineProps {
  mahadashaPeriods: ParsedMahadasha[];
}

/**
 * Component that displays a timeline of all Mahadasha periods
 */
export function MahadashaTimeline({ mahadashaPeriods }: MahadashaTimelineProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        Mahadasha Timeline
      </h2>

      <div className="space-y-4">
        {mahadashaPeriods.map((mahadasha, index) => {
          const planetColor = getPlanetColor(mahadasha.planet as DashaPlanet);
          const isActive = mahadasha.isCurrentPeriod;

          return (
            <div
              key={index}
              className={`flex gap-4 ${isActive ? 'opacity-100' : 'opacity-60'}`}
            >
              {/* Timeline marker */}
              <div className="flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: planetColor }}
                />
                {index < mahadashaPeriods.length - 1 && (
                  <div className="w-0.5 h-full bg-neutral-300 dark:bg-neutral-600 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {mahadasha.planet}
                    {mahadasha.isBalancePeriod && (
                      <span className="text-sm font-normal text-neutral-600 dark:text-neutral-400 ml-2">
                        (Balance Period)
                      </span>
                    )}
                  </h3>
                  {isActive && (
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {formatDateRange(mahadasha.startDateLocal, mahadasha.endDateLocal)}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {formatDuration(mahadasha.durationYears)}
                  {mahadasha.isBalancePeriod &&
                    mahadasha.balanceYears &&
                    ` (${formatDuration(mahadasha.balanceYears)} balance)`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
