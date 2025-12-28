import { useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import {
  getPlanetColor,
  getPlanetNameSinhala,
  formatDateRange,
  findActiveMahadasha,
  findActiveAntardasha,
  findActivePratyantardasha,
  findActiveSookshma,
} from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type {
  ParsedMahadasha,
  DashaPlanet,
} from "@/dashaApiIntegration/vimshottari-dasha.types";
import { TimelinePlayControls } from "./TimelinePlayControls";
import { DatePeriodDisplay } from "./DatePeriodDisplay";

interface DashaTimelineControlProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  mahadashaPeriods: ParsedMahadasha[];
  birthDate: Date;
}

// Helper function to format date and time in Sinhala format
const formatSinhalaDateTime = (date: Date, format: 'long' | 'short' = 'long'): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Determine AM/PM in Sinhala
  const period = hours >= 12 ? 'ප.ව.' : 'පෙ.ව.';

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12;

  if (format === 'long') {
    // Format: YYYY-MM-DD, ප.ව./පෙ.ව. hh:mm
    return `${year}-${month}-${day}, ${period} ${hours12}:${minutes}`;
  } else {
    // Format: YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }
};

// Helper function to format only date (no time)
const formatSinhalaDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Format: DD-MM-YYYY
  return `${day}-${month}-${year}`;
};

export function DashaTimelineControl({
  selectedDate,
  setSelectedDate,
  mahadashaPeriods,
  birthDate,
}: DashaTimelineControlProps) {
  // Calculate timeline bounds (birth date to birth date + 120 years)
  const timelineBounds = useMemo(() => {
    const endDate = new Date(birthDate);
    endDate.setFullYear(birthDate.getFullYear() + 120);
    return { birthDate, endDate };
  }, [birthDate]);

  // Calculate current position as percentage (0-100)
  const currentPosition = useMemo(() => {
    const totalMs =
      timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
    const currentMs =
      selectedDate.getTime() - timelineBounds.birthDate.getTime();
    return Math.max(0, Math.min(100, (currentMs / totalMs) * 100));
  }, [selectedDate, timelineBounds]);

  // Helper function to calculate position percentage for any date
  const calculatePosition = (date: Date): number => {
    const totalMs =
      timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
    const dateMs = date.getTime() - timelineBounds.birthDate.getTime();
    return Math.max(0, Math.min(100, (dateMs / totalMs) * 100));
  };

  // Convert slider value (0-100) to date
  const sliderValueToDate = (value: number): Date => {
    const totalMs =
      timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
    const targetMs = (value / 100) * totalMs;
    return new Date(timelineBounds.birthDate.getTime() + targetMs);
  };

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const newDate = sliderValueToDate(values[0]);

    // Validate date is within bounds
    if (
      newDate >= timelineBounds.birthDate &&
      newDate <= timelineBounds.endDate
    ) {
      setSelectedDate(newDate);
    }
  };

  // Find active Mahadasha for the selected date
  const activeMahadasha = useMemo(() => {
    return findActiveMahadasha(mahadashaPeriods, selectedDate);
  }, [mahadashaPeriods, selectedDate]);

  // Calculate all periods for selected date
  const selectedDatePeriods = useMemo(() => {
    const mahadasha = activeMahadasha;
    const antardasha = mahadasha ? findActiveAntardasha(mahadasha, selectedDate) : undefined;
    const pratyantardasha = antardasha ? findActivePratyantardasha(antardasha, selectedDate) : undefined;
    const sookshma = pratyantardasha ? findActiveSookshma(pratyantardasha, selectedDate) : undefined;

    return { mahadasha, antardasha, pratyantardasha, sookshma };
  }, [activeMahadasha, selectedDate]);

  return (
    <div className="w-full space-y-4">
      {/* Timeline Container */}
      <div className="relative w-full">
        {/* Timeline Track with Markers */}

        {/* Timeline Duration */}
        <div className="flex flex-col items-end justify-center">
                <TimelinePlayControls
            selectedDate={selectedDate}
            onDateTimeChange={setSelectedDate}
            className="mt-4"
          />
          {/* <span className="text-xl text-neutral-400 dark:text-neutral-500">
            විම්ශෝත්තරී දශා කාලරාමුව 120 වසර
          </span> */}
        </div>



              {/* Display periods for selected date */}
        {selectedDatePeriods && (
          <div className="mb-3">
            <DatePeriodDisplay
              selectedDate={selectedDate}
              mahadasha={selectedDatePeriods.mahadasha}
              antardasha={selectedDatePeriods.antardasha}
              pratyantardasha={selectedDatePeriods.pratyantardasha}
              sookshma={selectedDatePeriods.sookshma}
            />
          </div>
        )}

     
        <div className="relative h-8 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-xl shadow-md border border-neutral-300 dark:border-neutral-600 overflow-visible">
          {/* Mahadasha Segments with Labels */}
          {mahadashaPeriods.map((mahadasha, index) => {
            const startPercent = calculatePosition(mahadasha.startDateLocal);
            const endPercent =
              index < mahadashaPeriods.length - 1? calculatePosition(mahadashaPeriods[index + 1].startDateLocal)
                : 100;
            const widthPercent = endPercent - startPercent;
            const color = getPlanetColor(mahadasha.planet as DashaPlanet);
            const planetNameSinhala = getPlanetNameSinhala(mahadasha.planet);

            return (
              <div
                key={index}
                className="absolute top-0 h-full transition-all pointer-events-none z-0 flex items-center justify-center rounded-md"
                style={{
                  left: `${startPercent}%`,
                  width: `${widthPercent}%`,
                  background: `linear-gradient(to bottom, ${color}dd, ${color}aa)`,
                  boxShadow: `inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.2)`,
                }}
              >
                {/* Planet Name Label - only show if segment is wide enough */}
                {widthPercent > 5 && (
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

          {/* Mahadasha Divider Markers */}
          {mahadashaPeriods.map((mahadasha, index) => {
            const positionPercent = calculatePosition(mahadasha.startDateLocal);
            const color = getPlanetColor(mahadasha.planet as DashaPlanet);
            const planetNameSinhala = getPlanetNameSinhala(mahadasha.planet);
            const formattedDateTime = formatSinhalaDateTime(mahadasha.startDateLocal, 'short');

            return (
              <div
                key={`divider-${index}`}
                className="absolute top-0 h-full transition-all cursor-pointer group"
                style={{
                  left: `${positionPercent}%`,
                  width: "8px",
                  marginLeft: "-4px",
                  zIndex: 15,
                }}
              >
                {/* Visible Line */}
                <div
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 group-hover:w-2 transition-all shadow-lg"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 4px ${color}88, 0 2px 4px rgba(0,0,0,0.3)`
                  }}
                />

                {/* Hover Tooltip */}
                <div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                  style={{ zIndex: 9999 }}
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
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "6px solid #111827",
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Slider Component */}
          <div className="absolute inset-0 flex items-center px-2 z-10 pointer-events-none">
            <Slider
              value={[currentPosition]}
              onValueChange={handleSliderChange}
              max={100}
              step={0.01}
              className="w-full pointer-events-auto"
              aria-label="Dasha timeline: Select date"
              aria-valuetext={selectedDate.toLocaleDateString("si-LK")}
            />
          </div>

          {/* Current Position Indicator */}
          <div
            className="absolute top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-purple-700 pointer-events-none z-20 shadow-lg"
            style={{
              left: `${currentPosition}%`,
              boxShadow: '0 0 8px rgba(147, 51, 234, 0.6), 0 2px 6px rgba(0,0,0,0.3)'
            }}
          >
            {/* Date and Mahadasha Label on Right-Bottom Side */}
            <div className="absolute top-full mt-2 left-4 whitespace-nowrap">
              <div className="bg-gradient-to-br from-gray-600 to-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-2xl border border-purple-400 relative">
                {/* Arrow pointing up-left */}
                <div
                  className="absolute -top-2 left-2 w-0 h-0"
                  style={{
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: '6px solid rgb(75, 85, 99)',
                  }}
                />
                {activeMahadasha && (
                  <div
                    className="font-extrabold mb-0.5"
                    style={{
                      color: getPlanetColor(activeMahadasha.planet as DashaPlanet)
                    }}
                  >
                    {getPlanetNameSinhala(activeMahadasha.planet)} මහදාශාව
                  </div>
                )}
                <div>
                  {formatSinhalaDateTime(selectedDate, 'long')}
                </div>
              </div>
            </div>
          </div>
        </div>



  <div className="flex justify-between  text-sm px-1">
          {/* First Mahadasha Start */}
          <div className="flex flex-col items-start">
            {mahadashaPeriods.length > 0 && (
                <span className="text-neutral-800 dark:text-neutral-200 text-base">ආරම්භය   {formatSinhalaDateTime(mahadashaPeriods[0].startDateLocal, 'short')}</span>
            )}
          </div>

          {/* Last Mahadasha End */}
          <div className="flex flex-col items-end">
            {mahadashaPeriods.length > 0 && (
                <span className="text-neutral-800 dark:text-neutral-200 text-base">
                  අවසානය {formatSinhalaDateTime(mahadashaPeriods[mahadashaPeriods.length - 1].endDateLocal, 'short')}
                </span>
            )}
          </div>
        </div>
        
  
      </div>
    </div>
  );
}
