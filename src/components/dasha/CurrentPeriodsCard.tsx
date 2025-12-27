import {
  formatDashaPeriod,
  formatDateRange,
  formatDuration,
  formatRemainingTime,
  getPlanetColor,
  getElapsedPercentage,
} from '@/dashaApiIntegration/vimshottari-dasha.utils';
import type {
  ParsedMahadasha,
  ParsedAntardasha,
  ParsedPratyantardasha,
  DashaPlanet,
} from '@/dashaApiIntegration/vimshottari-dasha.types';

interface CurrentPeriodsCardProps {
  currentMahadasha: ParsedMahadasha | null;
  currentAntardasha: ParsedAntardasha | null;
  currentPratyantardasha: ParsedPratyantardasha | null;
}

/**
 * Component that displays the currently active Dasha periods
 */
export function CurrentPeriodsCard({
  currentMahadasha,
  currentAntardasha,
  currentPratyantardasha,
}: CurrentPeriodsCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        Current Dasha Periods
      </h2>

      <div className="space-y-4">
        {/* Mahadasha */}
        {currentMahadasha && (
          <div
            className="border-l-4 pl-4"
            style={{
              borderLeftColor: getPlanetColor(currentMahadasha.planet as DashaPlanet),
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {formatDashaPeriod(currentMahadasha.planet, 'Mahadasha')}
              </h3>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDuration(currentMahadasha.durationYears)}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {formatDateRange(
                currentMahadasha.startDateLocal,
                currentMahadasha.endDateLocal
              )}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
              {formatRemainingTime(currentMahadasha.endDateLocal)}
            </p>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all"
                style={{
                  width: `${getElapsedPercentage(
                    currentMahadasha.startDateLocal,
                    currentMahadasha.endDateLocal
                  )}%`,
                  backgroundColor: getPlanetColor(currentMahadasha.planet as DashaPlanet),
                }}
              />
            </div>
          </div>
        )}

        {/* Antardasha */}
        {currentAntardasha && (
          <div
            className="border-l-4 pl-4"
            style={{
              borderLeftColor: getPlanetColor(currentAntardasha.planet as DashaPlanet),
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {formatDashaPeriod(
                  currentMahadasha?.planet || '',
                  'Antardasha',
                  currentAntardasha.planet
                )}
              </h3>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDuration(currentAntardasha.durationYears)}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {formatDateRange(
                currentAntardasha.startDateLocal,
                currentAntardasha.endDateLocal
              )}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
              {formatRemainingTime(currentAntardasha.endDateLocal)}
            </p>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all"
                style={{
                  width: `${getElapsedPercentage(
                    currentAntardasha.startDateLocal,
                    currentAntardasha.endDateLocal
                  )}%`,
                  backgroundColor: getPlanetColor(currentAntardasha.planet as DashaPlanet),
                }}
              />
            </div>
          </div>
        )}

        {/* Pratyantardasha (if available) */}
        {currentPratyantardasha && (
          <div
            className="border-l-4 pl-4"
            style={{
              borderLeftColor: getPlanetColor(
                currentPratyantardasha.planet as DashaPlanet
              ),
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {currentMahadasha?.planet}-{currentAntardasha?.planet}-
                {currentPratyantardasha.planet} Pratyantardasha
              </h3>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDuration(currentPratyantardasha.durationYears)}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {formatDateRange(
                currentPratyantardasha.startDateLocal,
                currentPratyantardasha.endDateLocal
              )}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {formatRemainingTime(currentPratyantardasha.endDateLocal)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
