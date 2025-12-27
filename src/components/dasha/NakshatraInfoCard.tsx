import { getNakshatraLordColor } from '@/dashaApiIntegration/vimshottari-dasha.utils';
import type { NakshatraInfo } from '@/dashaApiIntegration/vimshottari-dasha.types';

interface NakshatraInfoCardProps {
  birthNakshatra: NakshatraInfo;
}

/**
 * Component that displays birth nakshatra information
 */
export function NakshatraInfoCard({ birthNakshatra }: NakshatraInfoCardProps) {
  const lordColor = getNakshatraLordColor(birthNakshatra.lord);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        Birth Nakshatra
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Nakshatra</p>
          <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {birthNakshatra.nakshatraName} ({birthNakshatra.nakshatraNumber}/27)
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Lord</p>
          <p className="text-lg font-semibold" style={{ color: lordColor }}>
            {birthNakshatra.lord}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Pada</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {birthNakshatra.pada}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Completed</p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {birthNakshatra.percentageCompleted.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2">
          <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full transition-all"
              style={{
                width: `${birthNakshatra.percentageCompleted}%`,
                backgroundColor: lordColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
