import { cn } from '@/lib/utils';

interface TimelinePlayControlsProps {
  selectedDate: Date;
  onDateTimeChange: (date: Date) => void;
  className?: string;
}

export function TimelinePlayControls({
  selectedDate,
  onDateTimeChange,
  className,
}: TimelinePlayControlsProps) {
  // Format date-time for input (YYYY-MM-DDThh:mm)
  const formatDateTimeForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Handle datetime change
  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateTimeValue = e.target.value;
    if (dateTimeValue) {
      onDateTimeChange(new Date(dateTimeValue));
    }
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <input
        id="timeline-datetime-picker"
        type="datetime-local"
        value={formatDateTimeForInput(selectedDate)}
        onChange={handleDateTimeChange}
        className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
