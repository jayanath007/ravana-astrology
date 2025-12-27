import { useEffect, useState, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVimshottariDasha } from '@/hooks/useVimshottariDasha';
import { saveBirthDetails, loadBirthDetails } from '@/utils/sessionStorage';
import { DatePeriodDisplay } from './DatePeriodDisplay';
import { DashaTimelineControl } from './DashaTimelineControl';
import { TimelinePlayControls } from './TimelinePlayControls';
import { DashaLevel } from '@/dashaApiIntegration/vimshottari-dasha.types';
import {
  findActiveMahadasha,
  findActiveAntardasha,
  findActivePratyantardasha,
  findActiveSookshma,
} from '@/dashaApiIntegration/vimshottari-dasha.utils';

/**
 * Main page component for displaying Vimshottari Dasha data
 */
export function DashaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data sourcing priority: location.state → sessionStorage
  const savedDetails = loadBirthDetails();
  const birthDetails = location.state?.birthDetails ?? savedDetails;

  // Save to sessionStorage for persistence
  useEffect(() => {
    if (birthDetails) {
      saveBirthDetails(birthDetails);
    }
  }, [birthDetails]);

  // Redirect if no birth details
  useEffect(() => {
    if (!birthDetails) {
      navigate('/', {
        state: {
          error: 'Birth details required. Please enter your birth information.',
        },
      });
    }
  }, [birthDetails, navigate]);

  // State for selected date (default to today)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // State for timeline animation
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle date change from input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      setSelectedDate(new Date(dateValue + 'T00:00:00'));
    }
  };

  // Fetch Dasha data
  const { data, isLoading, error, retry } = useVimshottariDasha({
    birthDetails,
    detailLevel: DashaLevel.Sookshma, // Level 4 - Shows all periods including Sookshma
    yearsToCalculate: 120,
    enabled: !!birthDetails,
  });

  // Calculate timeline bounds (birth date to birth date + 120 years)
  const timelineBounds = useMemo(() => {
    if (!data) return null;
    const birthDate = data.birthDateTimeLocal;
    const endDate = new Date(birthDate);
    endDate.setFullYear(birthDate.getFullYear() + 120);
    return { birthDate, endDate };
  }, [data]);

  // Calculate periods for selected date
  const selectedDatePeriods = useMemo(() => {
    if (!data) return null;

    const mahadasha = findActiveMahadasha(data.mahadashaPeriods, selectedDate);
    const antardasha = mahadasha ? findActiveAntardasha(mahadasha, selectedDate) : undefined;
    const pratyantardasha =
      antardasha ? findActivePratyantardasha(antardasha, selectedDate) : undefined;
    const sookshma =
      pratyantardasha ? findActiveSookshma(pratyantardasha, selectedDate) : undefined;

    return { mahadasha, antardasha, pratyantardasha, sookshma };
  }, [data, selectedDate]);

  // Timeline animation logic
  useEffect(() => {
    if (!isPlaying || !timelineBounds) return;

    const animate = (timestamp: number) => {
      // Update every 100ms (10 days per second = ~100ms per day)
      const msPerDay = 100;

      if (timestamp - lastUpdateRef.current >= msPerDay) {
        setSelectedDate((prevDate) => {
          const nextDate = new Date(prevDate);
          nextDate.setDate(nextDate.getDate() + 1);

          // Stop at end of timeline
          if (nextDate >= timelineBounds.endDate) {
            setIsPlaying(false);
            return timelineBounds.endDate;
          }

          return nextDate;
        });

        lastUpdateRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, timelineBounds]);

  // Control handlers
  const handleStepForward = () => {
    if (!timelineBounds) return;
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 1);
      // Don't go beyond end date
      return next <= timelineBounds.endDate ? next : timelineBounds.endDate;
    });
  };

  const handleStepBackward = () => {
    if (!timelineBounds) return;
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 1);
      // Don't go before birth date
      return next >= timelineBounds.birthDate ? next : timelineBounds.birthDate;
    });
  };

  const handleJumpToToday = () => {
    setSelectedDate(new Date());
    setIsPlaying(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-xl text-neutral-600 dark:text-neutral-400">
          Calculating Vimshottari Dasha...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">
            Error Loading Dasha Data
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={retry}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Success state with data
  if (!data) {
    return null;
  }

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100">
        Vimshottari Dasha
      </h1>

      {/* Timeline Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
          Timeline Controls
        </h2>

        {/* Timeline with markers */}
        <DashaTimelineControl
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          mahadashaPeriods={data.mahadashaPeriods}
          birthDate={data.birthDateTimeLocal}
        />

        {/* Play controls */}
        <TimelinePlayControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((prev) => !prev)}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          onJumpToToday={handleJumpToToday}
          className="mt-4"
        />
      </div>

      {/* Date Picker Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label
            htmlFor="date-picker"
            className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap"
          >
            Select Date:
          </label>
          <input
            id="date-picker"
            type="date"
            value={formatDateForInput(selectedDate)}
            onChange={handleDateChange}
            className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors whitespace-nowrap"
          >
            Today
          </button>
        </div>
      </div>

      {/* Display periods for selected date */}
      {selectedDatePeriods && (
        <DatePeriodDisplay
          selectedDate={selectedDate}
          mahadasha={selectedDatePeriods.mahadasha}
          antardasha={selectedDatePeriods.antardasha}
          pratyantardasha={selectedDatePeriods.pratyantardasha}
          sookshma={selectedDatePeriods.sookshma}
        />
      )}
    </main>
  );
}
