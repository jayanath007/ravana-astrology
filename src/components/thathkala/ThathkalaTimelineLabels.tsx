/**
 * ThathkalaTimelineLabels Component
 * Displays current, start, and end dates for the timeline with visual positioning
 */

import { formatSinhalaDateTime } from '@/dashaApiIntegration/vimshottari-dasha.utils';

interface ThathkalaTimelineLabelsProps {
  startDate: Date;
  endDate: Date;
  selectedDate: Date;
  currentPosition: number; // 0-100 percentage for positioning
}

/**
 * Timeline labels component showing current position and range bounds
 *
 * @param props - Component props
 * @param props.startDate - Timeline start date
 * @param props.endDate - Timeline end date
 * @param props.selectedDate - Currently selected date
 * @param props.currentPosition - Slider position (0-100)
 */
export function ThathkalaTimelineLabels({
  startDate,
  endDate,
  selectedDate,
  currentPosition,
}: ThathkalaTimelineLabelsProps) {
  return (
    <div className="space-y-1">
      {/* Top: Current selected date with position indicator */}
      <div className="relative h-6">
        <div
          className="absolute transition-all duration-150 ease-out"
          style={{
            left: `${currentPosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 text-purple-900 dark:text-purple-100 text-xs px-2 py-1 rounded-md shadow-lg border border-purple-300 dark:border-purple-600 whitespace-nowrap">
            <div className="font-bold">
              {formatSinhalaDateTime(selectedDate, 'long')}
            </div>
            {/* Arrow pointing down */}
            <div
              className="absolute -bottom-1 left-1/2 w-0 h-0 -translate-x-1/2"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderTop: '4px solid rgb(216, 180, 254)', // purple-300
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom: Start and end date labels */}
      <div className="flex justify-between text-xs px-1 mt-1">
        <div className="flex flex-col items-start">
          <span className="text-neutral-600 dark:text-neutral-400 text-xs">
            ආරම්භය
          </span>
          <span className="text-neutral-800 dark:text-neutral-200 font-medium">
            {formatSinhalaDateTime(startDate, 'short')}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-neutral-600 dark:text-neutral-400 text-xs">
            අවසානය
          </span>
          <span className="text-neutral-800 dark:text-neutral-200 font-medium">
            {formatSinhalaDateTime(endDate, 'short')}
          </span>
        </div>
      </div>
    </div>
  );
}
