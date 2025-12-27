import { useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import {
  getPlanetColor,
  getPlanetNameSinhala,
  formatDateRange,
} from '@/dashaApiIntegration/vimshottari-dasha.utils';
import type {
  ParsedMahadasha,
  DashaPlanet
} from '@/dashaApiIntegration/vimshottari-dasha.types';

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
    const totalMs = timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
    const currentMs = selectedDate.getTime() - timelineBounds.birthDate.getTime();
    return Math.max(0, Math.min(100, (currentMs / totalMs) * 100));
  }, [selectedDate, timelineBounds]);

  // Helper function to calculate position percentage for any date
  const calculatePosition = (date: Date): number => {
    const totalMs = timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
    const dateMs = date.getTime() - timelineBounds.birthDate.getTime();
    return Math.max(0, Math.min(100, (dateMs / totalMs) * 100));
  };

  // Convert slider value (0-100) to date
  const sliderValueToDate = (value: number): Date => {
    const totalMs = timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
    const targetMs = (value / 100) * totalMs;
    return new Date(timelineBounds.birthDate.getTime() + targetMs);
  };

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const newDate = sliderValueToDate(values[0]);

    // Validate date is within bounds
    if (newDate >= timelineBounds.birthDate && newDate <= timelineBounds.endDate) {
      setSelectedDate(newDate);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Timeline Container */}
      <div className="relative w-full">
        {/* Timeline Track with Markers */}
        <div className="relative h-16 bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
          {/* Mahadasha Markers */}
          {mahadashaPeriods.map((mahadasha, index) => {
            const positionPercent = calculatePosition(mahadasha.startDateLocal);
            const color = getPlanetColor(mahadasha.planet as DashaPlanet);
            const planetNameSinhala = getPlanetNameSinhala(mahadasha.planet);
            const dateRange = formatDateRange(
              mahadasha.startDateLocal,
              mahadasha.endDateLocal,
              'si-LK'
            );

            return (
              <div
                key={index}
                className="absolute top-0 h-full w-1 hover:w-2 transition-all cursor-pointer z-10"
                style={{
                  left: `${positionPercent}%`,
                  backgroundColor: color,
                }}
                title={`${planetNameSinhala} මහදාශාව\n${dateRange}`}
              />
            );
          })}

          {/* Slider Component */}
          <div className="absolute inset-0 flex items-center px-2">
            <Slider
              value={[currentPosition]}
              onValueChange={handleSliderChange}
              max={100}
              step={0.01}
              className="w-full"
              aria-label="Dasha timeline: Select date"
              aria-valuetext={selectedDate.toLocaleDateString('si-LK')}
            />
          </div>

          {/* Current Position Indicator */}
          <div
            className="absolute top-0 h-full w-0.5 bg-purple-600 pointer-events-none z-20"
            style={{ left: `${currentPosition}%` }}
          >
            {/* Date Label Above Indicator */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                {selectedDate.toLocaleDateString('si-LK', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Date Labels (Birth Date and End Date) */}
        <div className="flex justify-between mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span>
            {timelineBounds.birthDate.toLocaleDateString('si-LK', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <span className="text-xs text-neutral-500">120 වසර</span>
          <span>
            {timelineBounds.endDate.toLocaleDateString('si-LK', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
