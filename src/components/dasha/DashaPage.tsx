import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVimshottariDasha } from '@/hooks/useVimshottariDasha';
import { saveBirthDetails, loadBirthDetails } from '@/utils/sessionStorage';
import { NakshatraInfoCard } from './NakshatraInfoCard';
import { CurrentPeriodsCard } from './CurrentPeriodsCard';
import { MahadashaTimeline } from './MahadashaTimeline';
import { DatePeriodDisplay } from './DatePeriodDisplay';
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
        <div className="mb-6">
          <DatePeriodDisplay
            selectedDate={selectedDate}
            mahadasha={selectedDatePeriods.mahadasha}
            antardasha={selectedDatePeriods.antardasha}
            pratyantardasha={selectedDatePeriods.pratyantardasha}
            sookshma={selectedDatePeriods.sookshma}
          />
        </div>
      )}

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Birth Nakshatra Info */}
        <NakshatraInfoCard birthNakshatra={data.birthNakshatra} />

        {/* Summary Statistics */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Total Mahadashas
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {data.mahadashaPeriods.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Total Periods
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {data.totalPeriodsCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Detail Level
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {data.detailLevel === 1 && 'Mahadasha'}
                {data.detailLevel === 2 && 'Antardasha'}
                {data.detailLevel === 3 && 'Pratyantardasha'}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Years Calculated
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {data.yearsCalculated}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Periods */}
      <CurrentPeriodsCard
        currentMahadasha={data.currentMahadasha}
        currentAntardasha={data.currentAntardasha}
        currentPratyantardasha={data.currentPratyantardasha}
      />

      {/* Mahadasha Timeline */}
      <MahadashaTimeline mahadashaPeriods={data.mahadashaPeriods} />
    </main>
  );
}
