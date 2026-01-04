/**
 * AdaDawasa Component
 * Date and time picker for selecting a specific moment to view planetary positions
 * "Ada Dawasa" (අද දවස) means "Today" in Sinhala
 */

import { cn } from '@/lib/utils';

interface AdaDawasaProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
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
 * AdaDawasa date/time picker component
 * Allows users to select a specific date and time to view planetary positions
 */
export function AdaDawasa({
  selectedDate,
  onDateChange,
  className,
}: AdaDawasaProps) {
  // Handle datetime input change
  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateTimeValue = e.target.value;
    if (dateTimeValue) {
      onDateChange(new Date(dateTimeValue));
    }
  };

  // Set to current date/time (today)
  const handleSetToday = () => {
    onDateChange(new Date());
  };

  // Consistent styling with other components
  const inputClassName =
    'w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400';

  const labelClassName =
    'block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2';

  const buttonClassName =
    'w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400';

  return (
    <div
      className={cn(
        'bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700 p-4',
        className
      )}
    >
      <h2 className="text-xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        අද දවස
      </h2>

      <div className="flex flex-col gap-4">
        {/* Date and Time Picker */}
        <div>
          <label htmlFor="ada-dawasa-picker" className={labelClassName}>
            දිනය සහ වේලාව
          </label>
          <input
            id="ada-dawasa-picker"
            type="datetime-local"
            value={formatDateTimeForInput(selectedDate)}
            onChange={handleDateTimeChange}
            className={inputClassName}
          />
        </div>

        {/* Quick "Today" Button */}
        <div>
          <button
            type="button"
            onClick={handleSetToday}
            className={buttonClassName}
            aria-label="Set to current date and time"
          >
            දැන් (Now)
          </button>
        </div>

        {/* Display selected date info */}
        <div className="text-sm text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700 pt-4">
          <div className="flex justify-between">
            <span className="font-semibold">තෝරාගත් දිනය:</span>
            <span>{selectedDate.toLocaleDateString('si-LK')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-semibold">වේලාව:</span>
            <span>{selectedDate.toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
