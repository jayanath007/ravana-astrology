import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveBirthDetails, loadBirthDetails } from '@/utils/sessionStorage';
import { DashaTimelineControl } from './DashaTimelineControl';
import type { SelectedDatePeriods } from './DashaTimelineControl';
import { DatePeriodDisplay } from './DatePeriodDisplay';
import { TimelinePlayControls } from './TimelinePlayControls';
import { DashaLevel } from '@/dashaApiIntegration/vimshottari-dasha.types';

/**
 * Main page component for displaying Vimshottari Dasha data.
 * DashaTimelineControl is self-contained and handles its own API calling and loading state.
 */
export function DashaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // State for selected date (default to current date and time)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // State for storing calculated dasha periods
  const [selectedDatePeriods, setSelectedDatePeriods] = useState<SelectedDatePeriods | null>(null);

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

  return (
    <main className="container mx-auto p-4 min-h-screen">
      {/* Timeline Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">
        {/* Timeline Duration and Controls */}
        <div className="flex flex-col items-end justify-center">
          <TimelinePlayControls
            selectedDate={selectedDate}
            onDateTimeChange={setSelectedDate}
            className="mt-4"
          />
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

        {/* Timeline with markers */}
        <DashaTimelineControl
          birthDetails={birthDetails}
          detailLevel={DashaLevel.Sookshma}
          yearsToCalculate={120}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onPeriodsCalculated={setSelectedDatePeriods}
        />
      </div>
    </main>
  );
}
