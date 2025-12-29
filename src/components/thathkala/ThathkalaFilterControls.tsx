/**
 * ThathkalaFilterControls Component
 * Filter controls for the Thathkala page with zodiac selection and date range pickers
 */

import { cn } from '@/lib/utils';
import { ZODIAC_NAMES_SINHALA } from '@/utils/zodiac-names';

interface ThathkalaFilterControlsProps {
  selectedZodiac: number;
  startDate: Date;
  endDate: Date;
  onZodiacChange: (zodiac: number) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  className?: string;
}

/**
 * Formats a Date object to datetime-local input format (YYYY-MM-DDThh:mm)
 */
function formatDateTimeForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Filter controls component for Thathkala page
 * Provides zodiac sign selection and date range filtering
 */
export function ThathkalaFilterControls({
  selectedZodiac,
  startDate,
  endDate,
  onZodiacChange,
  onStartDateChange,
  onEndDateChange,
  className,
}: ThathkalaFilterControlsProps) {
  // Handle datetime input changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateTimeValue = e.target.value;
    if (dateTimeValue) {
      onStartDateChange(new Date(dateTimeValue));
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateTimeValue = e.target.value;
    if (dateTimeValue) {
      onEndDateChange(new Date(dateTimeValue));
    }
  };

  const handleZodiacChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onZodiacChange(Number(e.target.value));
  };

  // Consistent styling for all inputs
  const inputClassName =
    'w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400';

  const labelClassName =
    'block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2';

  return (
    <div
      className={cn(
        'bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700 p-4',
        className
      )}
    >
      <h2 className="text-xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        පෙරහන්
      </h2>

      <div className="flex flex-col gap-6">
        {/* Zodiac Sign Selector */}
        <div>
          <label htmlFor="zodiac-filter" className={labelClassName}>
            රාශිය
          </label>
          <select
            id="zodiac-filter"
            value={selectedZodiac}
            onChange={handleZodiacChange}
            className={inputClassName}
          >
            {Object.entries(ZODIAC_NAMES_SINHALA).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date Picker */}
        <div>
          <label htmlFor="start-date-filter" className={labelClassName}>
            ආරම්භක දිනය
          </label>
          <input
            id="start-date-filter"
            type="datetime-local"
            value={formatDateTimeForInput(startDate)}
            onChange={handleStartDateChange}
            className={inputClassName}
          />
        </div>

        {/* End Date Picker */}
        <div>
          <label htmlFor="end-date-filter" className={labelClassName}>
            අවසාන දිනය
          </label>
          <input
            id="end-date-filter"
            type="datetime-local"
            value={formatDateTimeForInput(endDate)}
            onChange={handleEndDateChange}
            className={inputClassName}
          />
        </div>
      </div>
    </div>
  );
}
