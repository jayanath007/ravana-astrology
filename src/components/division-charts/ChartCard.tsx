import { AstrologicalGrid } from '@/components/astrological-grid/AstrologicalGrid';
import type { PlanetSign } from '@/types/birthChart';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';

/**
 * Props for the ChartCard component
 */
interface ChartCardProps {
  title: string;
  zodiacNumber: number | undefined;
  planetSigns: PlanetSign[] | undefined;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  ariaLabel: string;
}

/**
 * Reusable chart card component that displays an astrological chart
 * with loading, error, and success states
 *
 * @param props - Component props
 * @returns A chart card with appropriate state rendering
 *
 * @example
 * <ChartCard
 *   title="Navamsa Chart (D9)"
 *   zodiacNumber={zodiacNumber}
 *   planetSigns={planetSigns}
 *   isLoading={isLoading}
 *   error={error}
 *   onRetry={retry}
 *   ariaLabel="Navamsa divisional chart for spiritual analysis"
 * />
 */
export function ChartCard({
  title,
  zodiacNumber,
  planetSigns,
  isLoading,
  error,
  onRetry,
  ariaLabel,
}: ChartCardProps) {
  return (
    <section aria-label={ariaLabel} className="flex flex-col">


      <div className="flex-1" aria-busy={isLoading}>
        {isLoading ? (
          <div
            className="flex items-center justify-center h-64 text-neutral-600 dark:text-neutral-400"
            role="status"
            aria-live="polite"
          >
            Loading {title}...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div
              className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 text-sm"
              role="alert"
            >
              <p className="mb-2">{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
                  aria-label={`Retry loading ${title}`}
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        ) : (
          <AstrologicalGrid
            zodiacNumber={zodiacNumber}
            planetSigns={planetSigns}
            showBackButton={false}
            title={title}
          />
        )}
      </div>
    </section>
  );
}
