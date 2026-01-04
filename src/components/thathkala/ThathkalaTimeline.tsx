/**
 * ThathkalaTimeline Component
 * Interactive timeline controller for selecting dates within a specified range
 */

import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useThathkalaTimeline } from '@/hooks/useThathkalaTimeline';
import { formatSinhalaDateTime } from '@/dashaApiIntegration/vimshottari-dasha.utils';
import type { PlanetaryMovementEvent } from '@/types/birthChart';

interface ThathkalaTimelineProps {
  startDate: Date;
  endDate: Date;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  planetaryEvents?: PlanetaryMovementEvent[];
  eventsLoading?: boolean;
  className?: string;
}

/**
 * Timeline controller component with visual date scrubbing
 *
 * @param props - Component props
 * @param props.startDate - Timeline start date (from filter)
 * @param props.endDate - Timeline end date (from filter)
 * @param props.selectedDate - Currently selected date
 * @param props.onDateChange - Callback when date changes via slider
 * @param props.className - Optional additional CSS classes
 */
export function ThathkalaTimeline({
  startDate,
  endDate,
  selectedDate,
  onDateChange,
  planetaryEvents = [],
  eventsLoading = false,
  className,
}: ThathkalaTimelineProps) {
  const { currentPosition, sliderValueToDate, isValidRange } =
    useThathkalaTimeline({
      startDate,
      endDate,
      selectedDate,
    });

  // Calculate position for each planetary event on the timeline
  const getEventPosition = (eventDateTime: string): number => {
    const eventDate = new Date(eventDateTime);
    const totalRange = endDate.getTime() - startDate.getTime();
    const eventOffset = eventDate.getTime() - startDate.getTime();
    return (eventOffset / totalRange) * 100;
  };

  // Handle slider value changes
  const handleSliderChange = (values: number[]) => {
    const sliderValue = values[0];
    const newDate = sliderValueToDate(sliderValue);
    onDateChange(newDate);
  };

  // Don't render if date range is invalid
  if (!isValidRange) {
    return (
      <div className={cn('p-4 text-center', className)}>
        <p className="text-red-600 dark:text-red-400 text-sm">
          වලංගු නොවන දින පරාසයකි. කරුණාකර ආරම්භක දිනය අවසාන දිනයට පෙර බව
          සහතික කරන්න.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Timeline Container with padding for labels */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700 p-2">
        {/* Title */}
        <h2 className="text-sm font-bold mb-1 text-neutral-900 dark:text-neutral-100 text-center">
          කාල රේඛාව
        </h2>

        <div className="space-y-1">
          {/* Start/End labels at top */}
          <div className="flex justify-between text-xs px-1">
            <div className="flex items-center gap-1">
              <span className="text-neutral-600 dark:text-neutral-400">
                ආරම්භය:
              </span>
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                {formatSinhalaDateTime(startDate, 'short')}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-neutral-600 dark:text-neutral-400">
                අවසානය:
              </span>
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                {formatSinhalaDateTime(endDate, 'short')}
              </span>
            </div>
          </div>

          {/* Slider with custom styling and event markers */}
          <div className="relative px-2">
            {/* Event markers layer (behind slider) */}
            {!eventsLoading && planetaryEvents.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {planetaryEvents.map((event, index) => {
                  const position = getEventPosition(event.eventDateTime);
                  // Only show events within the visible range
                  if (position < 0 || position > 100) return null;

                  return (
                    <div
                      key={`${event.planet}-${event.eventDateTime}-${index}`}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group"
                      style={{ left: `${position}%` }}
                      title={`${event.planet}: ${event.fromSignName} → ${event.toSignName}`}
                    >
                      {/* Event marker dot */}
                      <div className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400 border border-orange-700 dark:border-orange-300 shadow-sm" />

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          <div className="font-bold">{event.planet}</div>
                          <div>{event.fromSignName} → {event.toSignName}</div>
                          <div className="text-neutral-300 dark:text-neutral-600">
                            {formatSinhalaDateTime(new Date(event.eventDateTime), 'short')}
                          </div>
                          {/* Arrow pointing down */}
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                              borderLeft: '4px solid transparent',
                              borderRight: '4px solid transparent',
                              borderTop: '4px solid rgb(23, 23, 23)', // neutral-900
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <Slider
              value={[currentPosition]}
              onValueChange={handleSliderChange}
              min={0}
              max={100}
              step={0.01}
              className="w-full"
              aria-label="දින කාල රේඛාව"
            />

            {/* Custom slider thumb styling */}
            <style>{`
              [role="slider"] {
                width: 20px;
                height: 20px;
                border-width: 2px;
                border-color: rgb(168, 85, 247);
                background: linear-gradient(to bottom right, rgb(255, 255, 255), rgb(243, 232, 255));
                box-shadow: 0 4px 6px -1px rgba(168, 85, 247, 0.3), 0 2px 4px -1px rgba(168, 85, 247, 0.2);
              }

              [role="slider"]:hover {
                background: linear-gradient(to bottom right, rgb(250, 245, 255), rgb(233, 213, 255));
                box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.4), 0 4px 6px -2px rgba(168, 85, 247, 0.3);
              }

              [role="slider"]:focus-visible {
                box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.5);
              }

              .dark [role="slider"] {
                background: linear-gradient(to bottom right, rgb(30, 27, 75), rgb(88, 28, 135));
                border-color: rgb(216, 180, 254);
              }

              .dark [role="slider"]:hover {
                background: linear-gradient(to bottom right, rgb(46, 16, 101), rgb(107, 33, 168));
              }

              @media (max-width: 640px) {
                [role="slider"] {
                  width: 28px;
                  height: 28px;
                }
              }
            `}</style>
          </div>

          {/* Progress indicator bar */}
          <div className="relative h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 transition-all duration-150 ease-out"
              style={{ width: `${currentPosition}%` }}
            />
          </div>

          {/* Current selected date with position indicator (below slider) */}
          <div className="relative h-5">
            <div
              className="absolute transition-all duration-150 ease-out"
              style={{
                left: `${currentPosition}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 text-purple-900 dark:text-purple-100 text-xs px-2 py-0.5 rounded shadow-md border border-purple-300 dark:border-purple-600 whitespace-nowrap">
                <div className="font-semibold">
                  {formatSinhalaDateTime(selectedDate, 'long')}
                </div>
                {/* Arrow pointing up */}
                <div
                  className="absolute -top-0.5 left-1/2 w-0 h-0 -translate-x-1/2"
                  style={{
                    borderLeft: '3px solid transparent',
                    borderRight: '3px solid transparent',
                    borderBottom: '3px solid rgb(216, 180, 254)', // purple-300
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
