import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AstrologicalGrid } from '@/components/astrological-grid/AstrologicalGrid';
import { getNavamsaChartData, getThathkaalaKendraChartData } from '@/services/birthChartService';
import type { PlanetSign, BirthDetails } from '@/types/birthChart';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';

export function DivisionChartsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Rasi chart data (D1) from location state
  const zodiacNumber = location.state?.zodiacNumber as number | undefined;
  const planetSigns = location.state?.planetSigns as PlanetSign[] | undefined;
  const birthDetails = location.state?.birthDetails as BirthDetails | undefined;

  // Navamsa chart data (D9) - to be fetched
  const [navamsaZodiacNumber, setNavamsaZodiacNumber] = useState<number | undefined>();
  const [navamsaPlanetSigns, setNavamsaPlanetSigns] = useState<PlanetSign[] | undefined>();
  const [isLoadingNavamsa, setIsLoadingNavamsa] = useState(false);
  const [navamsaError, setNavamsaError] = useState<string | null>(null);

  // Thathkaala Kendra chart data - to be fetched
  const [drekkanaZodiacNumber, setDrekkanaZodiacNumber] = useState<number | undefined>();
  const [drekkanaPlanetSigns, setDrekkanaPlanetSigns] = useState<PlanetSign[] | undefined>();
  const [isLoadingDrekkana, setIsLoadingDrekkana] = useState(false);
  const [drekkanaError, setDrekkanaError] = useState<string | null>(null);

  // Fetch Navamsa chart data on component mount
  useEffect(() => {
    const fetchNavamsaData = async () => {
      if (!birthDetails) {
        setNavamsaError('Birth details not available');
        return;
      }

      setIsLoadingNavamsa(true);
      setNavamsaError(null);

      try {
        // Fetch Navamsa chart data using service layer
        const { zodiacNumber, planetSigns } = await getNavamsaChartData(birthDetails);

        setNavamsaZodiacNumber(zodiacNumber);
        setNavamsaPlanetSigns(planetSigns);
      } catch (err) {
        setNavamsaError(err instanceof Error ? err.message : 'Failed to fetch Navamsa chart');
        console.error('Error fetching Navamsa chart:', err);
      } finally {
        setIsLoadingNavamsa(false);
      }
    };

    fetchNavamsaData();
  }, [birthDetails]);

  // Fetch Thathkaala Kendra chart data on component mount
  useEffect(() => {
    const fetchDrekkanaData = async () => {
      if (!birthDetails) {
        setDrekkanaError('Birth details not available');
        return;
      }

      setIsLoadingDrekkana(true);
      setDrekkanaError(null);

      try {
        // Fetch Thathkaala Kendra chart data using service layer
        // Uses current date/time for ascendant and birth details for planet signs
        const { zodiacNumber, planetSigns } = await getThathkaalaKendraChartData(birthDetails);

        setDrekkanaZodiacNumber(zodiacNumber);
        setDrekkanaPlanetSigns(planetSigns);
      } catch (err) {
        setDrekkanaError(err instanceof Error ? err.message : 'Failed to fetch Thathkaala Kendra chart');
        console.error('Error fetching Thathkaala Kendra chart:', err);
      } finally {
        setIsLoadingDrekkana(false);
      }
    };

    fetchDrekkanaData();
  }, [birthDetails]);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className={`px-4 py-2 font-medium rounded-md transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
        >
          ← Back to Input
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-100">
        Division Charts
      </h1>

      {/* Three Grids Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grid 1 - Rasi Chart (D1) */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-center mb-3 text-neutral-800 dark:text-neutral-200">
            Rasi Chart (D1)
          </h2>
          <div className="flex-1">
            <AstrologicalGrid
              zodiacNumber={zodiacNumber}
              planetSigns={planetSigns}
              showBackButton={false}
            />
          </div>
        </div>

        {/* Grid 2 - Navamsa Chart (D9) */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-center mb-3 text-neutral-800 dark:text-neutral-200">
            Navamsa Chart (D9)
          </h2>
          <div className="flex-1">
            {isLoadingNavamsa ? (
              <div className="flex items-center justify-center h-64 text-neutral-600 dark:text-neutral-400">
                Loading Navamsa chart...
              </div>
            ) : navamsaError ? (
              <div className="flex items-center justify-center h-64">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm">
                  {navamsaError}
                </div>
              </div>
            ) : (
              <AstrologicalGrid
                zodiacNumber={navamsaZodiacNumber}
                planetSigns={navamsaPlanetSigns}
                showBackButton={false}
              />
            )}
          </div>
        </div>

        {/* Grid 3 - Thathkaala Kendra */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-center mb-3 text-neutral-800 dark:text-neutral-200">
            Thathkaala Kendra
          </h2>
          <div className="flex-1">
            {isLoadingDrekkana ? (
              <div className="flex items-center justify-center h-64 text-neutral-600 dark:text-neutral-400">
                Loading Thathkaala Kendra...
              </div>
            ) : drekkanaError ? (
              <div className="flex items-center justify-center h-64">
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm">
                  {drekkanaError}
                </div>
              </div>
            ) : (
              <AstrologicalGrid
                zodiacNumber={drekkanaZodiacNumber}
                planetSigns={drekkanaPlanetSigns}
                showBackButton={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
