import { useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import {
  getPlanetColor,
  getPlanetNameSinhala,
  formatDateRange,
  findActiveMahadasha,
} from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type {
  ParsedMahadasha,
  DashaPlanet,
} from "@/dashaApiIntegration/vimshottari-dasha.types";
import { TimelinePlayControls } from "./TimelinePlayControls";

interface DashaTimelineControlProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  mahadashaPeriods: ParsedMahadasha[];
  birthDate: Date;
}

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
    <div className="flex justify-between mt-1 text-sm">
          {/* First Mahadasha Start */}
          <div className="flex flex-col items-start">
            {mahadashaPeriods.length > 0 && (
              <>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {mahadashaPeriods[0].startDateLocal.toLocaleDateString(
                    "si-LK",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              </>
            )}
          </div>

          {/* Last Mahadasha End */}
          <div className="flex flex-col items-end">
            {mahadashaPeriods.length > 0 && (
              <>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {mahadashaPeriods[
                    mahadashaPeriods.length - 1
                  ].endDateLocal.toLocaleDateString("si-LK", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="relative h-16 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-visible">
          {/* Mahadasha Segments with Labels */}
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
                key={index}
                className="absolute top-0 h-full transition-all pointer-events-none z-0 flex items-center justify-center"
                style={{
                  left: `${startPercent}%`,
                  width: `${widthPercent}%`,
                  backgroundColor: color,
                  opacity: 0.6,
                }}
              >
                {/* Planet Name Label - only show if segment is wide enough */}
                {widthPercent > 5 && (
                  <span className="text-white text-xs font-semibold drop-shadow-md px-1 truncate">
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
            const formattedDate = mahadasha.startDateLocal.toLocaleDateString(
              "si-LK",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
            const formattedTime = mahadasha.startDateLocal.toLocaleTimeString(
              "si-LK",
              {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            );

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
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 group-hover:w-2 transition-all"
                  style={{ backgroundColor: color }}
                />

                {/* Hover Tooltip */}
                <div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                  style={{ zIndex: 9999 }}
                >
                  <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl">
                    <div
                      className="font-bold text-center mb-1"
                      style={{ color }}
                    >
                      {planetNameSinhala} මහදාශාව ආරම්භය
                    </div>
                    <div className="text-center mb-0.5">{formattedDate}</div>
                    <div className="text-center text-gray-300">
                      {formattedTime}
                    </div>
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
            className="absolute top-0 h-full w-0.5 bg-purple-600 pointer-events-none z-20"
            style={{ left: `${currentPosition}%` }}
          >
            {/* Date and Mahadasha Label Above Indicator */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                {activeMahadasha && (
                  <div className="font-semibold mb-0.5">
                    {getPlanetNameSinhala(activeMahadasha.planet)} මහදාශාව
                  </div>
                )}
                <div>
                  {selectedDate.toLocaleDateString("si-LK", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

    
    
      </div>
    </div>
  );
}
