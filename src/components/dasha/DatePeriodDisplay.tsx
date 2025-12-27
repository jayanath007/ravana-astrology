import {
  formatDateRange,
  getPlanetColor,
  getPlanetNameSinhala,
} from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type {
  ParsedMahadasha,
  ParsedAntardasha,
  ParsedPratyantardasha,
  ParsedSookshma,
  DashaPlanet,
} from "@/dashaApiIntegration/vimshottari-dasha.types";

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
}

function DashaCard({
  label,
  planet,
  color,
  startDate,
  endDate,
}: DashaCardProps) {
  const sinhalaName = getPlanetNameSinhala(planet);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-600 overflow-hidden">
      {/* Header with label and planet */}
      <div className="p-2 bg-white dark:bg-neutral-800">
        <p className="text-1xl font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
          {label}
        </p>
        <p >
          <span className="text-3xl font-bold" style={{ color: color }}> {sinhalaName} </span>{" "}
          <span> {formatDateRange(startDate, endDate, "si-LK")} </span>
        </p>
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
          No Dasha periods found for this date. The date may be outside the
          calculated range.
        </p>
      </div>
    );
  }

  return (
    <div>
 

      {/* Flex layout for cards with separators */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
        {/* Mahadasha Card */}
        <div className="flex-1">
          <DashaCard
            label="මහදාශාව"
            planet={mahadasha.planet}
            color={getPlanetColor(mahadasha.planet as DashaPlanet)}
            startDate={mahadasha.startDateLocal}
            endDate={mahadasha.endDateLocal}
          />
        </div>

        {/* Separator */}
        <div className="hidden lg:flex items-center justify-center text-4xl font-bold text-neutral-400 dark:text-neutral-500">
          &gt;
        </div>

        {/* Antardasha Card */}
        <div className="flex-1">
          {antardasha ? (
            <DashaCard
              label="අන්තරදාශාව"
              planet={antardasha.planet}
              color={getPlanetColor(antardasha.planet as DashaPlanet)}
              startDate={antardasha.startDateLocal}
              endDate={antardasha.endDateLocal}
            />
          ) : (
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-600 p-6 flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  අන්තරදාශාව
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

        {/* Separator */}
        <div className="hidden lg:flex items-center justify-center text-4xl font-bold text-neutral-400 dark:text-neutral-500">
          &gt;
        </div>

        {/* Pratyantardasha Card */}
        <div className="flex-1">
          {pratyantardasha ? (
            <DashaCard
              label="වීදසාව"
              planet={pratyantardasha.planet}
              color={getPlanetColor(pratyantardasha.planet as DashaPlanet)}
              startDate={pratyantardasha.startDateLocal}
              endDate={pratyantardasha.endDateLocal}
            />
          ) : (
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-600 p-6 flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  වීදසාව
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

        {/* Separator */}
        <div className="hidden lg:flex items-center justify-center text-4xl font-bold text-neutral-400 dark:text-neutral-500">
          &gt;
        </div>

        {/* Sookshma Card */}
        <div className="flex-1">
          {sookshma ? (
            <DashaCard
              label="සුක්ෂ්මදාශාව"
              planet={sookshma.planet}
              color={getPlanetColor(sookshma.planet as DashaPlanet)}
              startDate={sookshma.startDateLocal}
              endDate={sookshma.endDateLocal}
            />
          ) : (
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-600 p-6 flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                  සුක්ෂ්මදාශාව
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
      </div>

 
    </div>
  );
}
