import { useLocation, useNavigate } from 'react-router-dom';
import { AstrologicalGrid } from '@/components/astrological-grid/AstrologicalGrid';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';

export function DivisionChartsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const zodiacNumber = location.state?.zodiacNumber as number | undefined;
  const planetSigns = location.state?.planetSigns as PlanetSign[] | undefined;

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
            <AstrologicalGrid
              zodiacNumber={zodiacNumber}
              planetSigns={planetSigns}
              showBackButton={false}
            />
          </div>
        </div>

        {/* Grid 3 - Drekkana Chart (D3) */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-center mb-3 text-neutral-800 dark:text-neutral-200">
            Drekkana Chart (D3)
          </h2>
          <div className="flex-1">
            <AstrologicalGrid
              zodiacNumber={zodiacNumber}
              planetSigns={planetSigns}
              showBackButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
