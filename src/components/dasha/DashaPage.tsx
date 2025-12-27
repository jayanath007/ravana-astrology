import { useEffect, useState, useMemo } from 'react';
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

  // State for selected date (default to current date and time)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
      {/* Timeline Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">

        {/* Timeline with markers */}
        <DashaTimelineControl
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          mahadashaPeriods={data.mahadashaPeriods}
          birthDate={data.birthDateTimeLocal}
        />

   
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
