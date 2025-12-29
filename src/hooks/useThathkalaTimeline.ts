/**
 * useThathkalaTimeline Hook
 * Provides timeline calculation utilities for the Thathkala page
 * Converts between dates and slider positions (0-100 percentage)
 */

import { useMemo } from 'react';

interface UseThathkalaTimelineOptions {
  startDate: Date;
  endDate: Date;
  selectedDate: Date;
}

interface UseThathkalaTimelineReturn {
  currentPosition: number;
  calculatePosition: (date: Date) => number;
  sliderValueToDate: (value: number) => Date;
  isValidRange: boolean;
}

/**
 * Hook for managing timeline calculations
 *
 * @param options - Timeline configuration with start, end, and selected dates
 * @returns Timeline utilities including position calculation and date conversion
 *
 * @example
 * const { currentPosition, sliderValueToDate } = useThathkalaTimeline({
 *   startDate: new Date('2025-01-01'),
 *   endDate: new Date('2025-12-31'),
 *   selectedDate: new Date('2025-06-15'),
 * });
 */
export function useThathkalaTimeline({
  startDate,
  endDate,
  selectedDate,
}: UseThathkalaTimelineOptions): UseThathkalaTimelineReturn {
  // Validate date range
  const isValidRange = useMemo(() => {
    return startDate < endDate;
  }, [startDate, endDate]);

  // Calculate position percentage (0-100) for any date
  const calculatePosition = useMemo(() => {
    return (date: Date): number => {
      if (!isValidRange) return 50; // Default to middle if invalid

      const totalMs = endDate.getTime() - startDate.getTime();
      const dateMs = date.getTime() - startDate.getTime();

      // Clamp between 0 and 100
      const position = (dateMs / totalMs) * 100;
      return Math.max(0, Math.min(100, position));
    };
  }, [startDate, endDate, isValidRange]);

  // Convert slider value (0-100) back to date
  const sliderValueToDate = useMemo(() => {
    return (value: number): Date => {
      if (!isValidRange) return new Date();

      const totalMs = endDate.getTime() - startDate.getTime();
      const targetMs = (value / 100) * totalMs;
      return new Date(startDate.getTime() + targetMs);
    };
  }, [startDate, endDate, isValidRange]);

  // Calculate current position for selected date
  const currentPosition = useMemo(() => {
    return calculatePosition(selectedDate);
  }, [selectedDate, calculatePosition]);

  return {
    currentPosition,
    calculatePosition,
    sliderValueToDate,
    isValidRange,
  };
}
