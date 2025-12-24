import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { TAILWIND_CLASSES } from '@/styles/theme-colors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for catching React rendering errors in chart components
 *
 * Provides a graceful fallback UI when an error occurs, preventing the entire
 * application from crashing. Includes a retry mechanism to allow users to
 * recover from errors.
 *
 * @example
 * <ChartErrorBoundary>
 *   <DivisionChartsPage />
 * </ChartErrorBoundary>
 */
export class ChartErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error information for debugging
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Chart rendering error:', error, errorInfo);
  }

  /**
   * Reset error boundary state to retry rendering
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full p-6 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg text-center">
            <h1 className="text-xl font-bold text-red-700 dark:text-red-300 mb-4">
              Something went wrong
            </h1>

            <p className="text-red-600 dark:text-red-400 mb-4">
              {this.state.error?.message || 'An unexpected error occurred while rendering the charts.'}
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className={`w-full px-4 py-2 font-medium rounded-md transition-colors ${TAILWIND_CLASSES.ui.backButton}`}
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-4 py-2 font-medium rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              >
                Return to Home
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                  Error Details
                </summary>
                <pre className="mt-2 p-2 bg-neutral-100 dark:bg-neutral-800 rounded text-xs overflow-auto max-h-48 text-neutral-800 dark:text-neutral-200">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
