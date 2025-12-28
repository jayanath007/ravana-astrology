import { AstrologicalGrid } from '@/components/astrological-grid/AstrologicalGrid';
import type { PlanetSign } from '@/types/birthChart';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';

/**
 * Props for the ChartContainer component
 */
interface ChartContainerProps {
  title: string;
  ariaLabel: string;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  zodiacNumber?: number;
  planetSigns?: PlanetSign[];
}

/**
 * Shared presentational wrapper for all chart types
 *
 * Handles three rendering states:
 * - Loading: Shows loading message with accessibility
 * - Error: Shows error message with retry button
 * - Success: Renders AstrologicalGrid with chart data
 *
 * This component extracts common rendering logic previously duplicated
 * across different chart implementations.
 *
 * @param props - Component props
 * @returns A chart container with appropriate state rendering
 *
 * @example
 * <ChartContainer
 *   title="Rasi Chart"
 *   ariaLabel="Rasi birth chart displaying ascendant..."
 *   isLoading={false}
 *   error={null}
 *   onRetry={handleRetry}
 *   zodiacNumber={1}
 *   planetSigns={[...]}
 * />
 */
export function ChartContainer({
  title,
  ariaLabel,
  isLoading,
  error,
  onRetry,
  zodiacNumber,
  planetSigns,
}: ChartContainerProps) {
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
              <button
                onClick={onRetry}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
                aria-label={`Retry loading ${title}`}
              >
                Retry
              </button>
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
