import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveBirthDetails, loadBirthDetails } from '@/utils/sessionStorage';
import { DashaTimelineControl } from './DashaTimelineControl';
import { DashaLevel } from '@/dashaApiIntegration/vimshottari-dasha.types';

/**
 * Main page component for displaying Vimshottari Dasha data.
 * DashaTimelineControl is self-contained and handles its own API calling and loading state.
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

  return (
    <main className="container mx-auto p-4 min-h-screen">
      {/* Timeline Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 mb-6">
        {/* Timeline with markers */}
        <DashaTimelineControl
          birthDetails={birthDetails}
          detailLevel={DashaLevel.Sookshma}
          yearsToCalculate={120}
        />
      </div>
    </main>
  );
}
