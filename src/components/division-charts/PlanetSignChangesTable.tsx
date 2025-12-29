/**
 * PlanetSignChangesTable Component
 * Displays planet sign changes data in a table with Sinhala labels
 */

import type { PlanetSign } from '@/types/birthChart';
import { getPlanetSinhalaName } from '@/utils/planet-names';
import { getZodiacNameSinhala } from '@/utils/zodiac-names';
import { formatSinhalaDateTime } from '@/dashaApiIntegration/vimshottari-dasha.utils';

interface PlanetSignChangesTableProps {
  planetSigns?: PlanetSign[];
  isLoading?: boolean;
}

/**
 * Formats date string to Sinhala long format
 */
function formatDateString(dateStr: string | undefined): string {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    return formatSinhalaDateTime(date, 'long');
  } catch {
    return dateStr;
  }
}

/**
 * Component to display planet sign changes in a table format
 */
export function PlanetSignChangesTable({
  planetSigns,
  isLoading,
}: PlanetSignChangesTableProps) {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <p className="text-neutral-600 dark:text-neutral-400">
          දත්ත පූරණය වෙමින්...
        </p>
      </div>
    );
  }

  if (!planetSigns || planetSigns.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <p className="text-neutral-600 dark:text-neutral-400">
          ග්‍රහ දත්ත නොමැත
        </p>
      </div>
    );
  }

  // Sort planets by nextSignChangeDate in ascending order
  const sortedPlanetSigns = [...planetSigns].sort((a, b) => {
    // Handle cases where nextSignChangeDate might be undefined
    if (!a.nextSignChangeDate && !b.nextSignChangeDate) return 0;
    if (!a.nextSignChangeDate) return 1; // Put undefined dates at the end
    if (!b.nextSignChangeDate) return -1;

    // Compare dates
    const dateA = new Date(a.nextSignChangeDate);
    const dateB = new Date(b.nextSignChangeDate);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-4">
        <h2 className=" text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
           ග්‍රහ මාරුවීම්
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-neutral-200 dark:bg-neutral-700">
                <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3  text-left font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                  ග්‍රහයා
                </th>
                <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-3  text-left font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                  ඊළඟ ග්‍රහ මාරුව
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlanetSigns.map((planetSign, index) => (
                <tr
                  key={`${planetSign.planet}-${index}`}
                  className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3  text-neutral-900 dark:text-neutral-100 font-medium whitespace-nowrap">
                    {getPlanetSinhalaName(planetSign.planet)}
                  </td>
                  <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-3  text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                    {formatDateString(planetSign.nextSignChangeDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
