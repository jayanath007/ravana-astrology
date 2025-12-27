import {
  formatDateRange,
  formatDuration,
  formatRemainingTime,
  getPlanetColor,
  getElapsedPercentage,
  getPlanetNameSinhala,
} from '@/dashaApiIntegration/vimshottari-dasha.utils';
import type {
  ParsedMahadasha,
  ParsedAntardasha,
  ParsedPratyantardasha,
  ParsedSookshma,
  DashaPlanet,
} from '@/dashaApiIntegration/vimshottari-dasha.types';

interface DatePeriodDisplayProps {
  selectedDate: Date;
  mahadasha: ParsedMahadasha | undefined;
  antardasha: ParsedAntardasha | undefined;
  pratyantardasha: ParsedPratyantardasha | undefined;
  sookshma: ParsedSookshma | undefined;
}

interface DashaCardProps {
  label: string;
  planet: string;
  color: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  selectedDate: Date;
}

function DashaCard({
  label,
  planet,
  color,
  startDate,
  endDate,
  duration,
  selectedDate,
}: DashaCardProps) {
  const progress = getElapsedPercentage(startDate, endDate, selectedDate);
  const sinhalaName = getPlanetNameSinhala(planet);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header with label and planet */}
      <div
        className="p-4"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">
              {label}
            </p>
            <h3 className="text-2xl font-bold text-white">{sinhalaName}</h3>
            <p className="text-xs text-white/70 mt-1">{planet}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/80">Progress</p>
            <p className="text-xl font-bold text-white">{progress.toFixed(1)}%</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full transition-all bg-white shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card body with details */}
      <div className="p-4 space-y-3">
        {/* Duration */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase mb-1">
            Duration
          </p>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {formatDuration(duration)}
          </p>
        </div>

        {/* Date range */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase mb-1">
            Period
          </p>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {formatDateRange(startDate, endDate)}
          </p>
        </div>

        {/* Remaining time */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase mb-1">
            Status
          </p>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {formatRemainingTime(endDate, selectedDate)}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Component that displays Dasha periods for a selected date in breadcrumb format
 */
export function DatePeriodDisplay({
  selectedDate,
  mahadasha,
  antardasha,
  pratyantardasha,
  sookshma,
}: DatePeriodDisplayProps) {
  if (!mahadasha) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
          Dasha Periods for {selectedDate.toLocaleDateString()}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          No Dasha periods found for this date. The date may be outside the calculated range.
        </p>
      </div>
    );
  }

  // Check if all levels are available
  const hasSookshma = !!sookshma;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        Dasha Periods for {selectedDate.toLocaleDateString()}
      </h2>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mahadasha Card */}
        <DashaCard
          label="Mahadasha"
          planet={mahadasha.planet}
          color={getPlanetColor(mahadasha.planet as DashaPlanet)}
          startDate={mahadasha.startDateLocal}
          endDate={mahadasha.endDateLocal}
          duration={mahadasha.durationYears}
          selectedDate={selectedDate}
        />

        {/* Antardasha Card */}
        {antardasha ? (
          <DashaCard
            label="Antardasha"
            planet={antardasha.planet}
            color={getPlanetColor(antardasha.planet as DashaPlanet)}
            startDate={antardasha.startDateLocal}
            endDate={antardasha.endDateLocal}
            duration={antardasha.durationYears}
            selectedDate={selectedDate}
          />
        ) : (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Antardasha
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Not available
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                Increase detail level
              </p>
            </div>
          </div>
        )}

        {/* Pratyantardasha Card */}
        {pratyantardasha ? (
          <DashaCard
            label="Pratyantardasha"
            planet={pratyantardasha.planet}
            color={getPlanetColor(pratyantardasha.planet as DashaPlanet)}
            startDate={pratyantardasha.startDateLocal}
            endDate={pratyantardasha.endDateLocal}
            duration={pratyantardasha.durationYears}
            selectedDate={selectedDate}
          />
        ) : (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Pratyantardasha
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Not available
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                Increase detail level
              </p>
            </div>
          </div>
        )}

        {/* Sookshma Card */}
        {sookshma ? (
          <DashaCard
            label="Sookshma"
            planet={sookshma.planet}
            color={getPlanetColor(sookshma.planet as DashaPlanet)}
            startDate={sookshma.startDateLocal}
            endDate={sookshma.endDateLocal}
            duration={sookshma.durationYears}
            selectedDate={selectedDate}
          />
        ) : (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                Sookshma
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Not available
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                Increase detail level
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status message */}
      <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
        {hasSookshma ? (
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            All 4 levels of Dasha periods are displayed
          </p>
        ) : (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Some Dasha levels are not available. Increase detail level to see all periods.
          </p>
        )}
      </div>
    </div>
  );
}
