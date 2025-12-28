import { useMemo } from "react";
import {
  findActiveMahadasha,
  findActiveAntardasha,
  findActivePratyantardasha,
  findActiveSookshma,
} from "@/dashaApiIntegration/vimshottari-dasha.utils";
import type {
  ParsedMahadasha,
  ParsedAntardasha,
  ParsedPratyantardasha,
  ParsedSookshma,
} from "@/dashaApiIntegration/vimshottari-dasha.types";
import { TIMELINE_TOTAL_YEARS } from "@/components/dasha/timeline/timeline.constants";

interface UseTimelineCalculationsOptions {
  birthDate: Date;
  selectedDate: Date;
  mahadashaPeriods: ParsedMahadasha[];
}

interface TimelineBounds {
  birthDate: Date;
  endDate: Date;
}

interface UseTimelineCalculationsReturn {
  timelineBounds: TimelineBounds;
  currentPosition: number;
  calculatePosition: (date: Date) => number;
  sliderValueToDate: (value: number) => Date;
  activeMahadasha: ParsedMahadasha | undefined;
  selectedDatePeriods: {
    mahadasha: ParsedMahadasha | undefined;
    antardasha: ParsedAntardasha | undefined;
    pratyantardasha: ParsedPratyantardasha | undefined;
    sookshma: ParsedSookshma | undefined;
  };
}

/**
 * Custom hook for timeline calculations and date conversions
 * Encapsulates all timeline position calculation logic
 */
export function useTimelineCalculations({
  birthDate,
  selectedDate,
  mahadashaPeriods,
}: UseTimelineCalculationsOptions): UseTimelineCalculationsReturn {
  // Calculate timeline bounds (birth date to birth date + 120 years)
  const timelineBounds = useMemo(() => {
    const endDate = new Date(birthDate);
    endDate.setFullYear(birthDate.getFullYear() + TIMELINE_TOTAL_YEARS);
    return { birthDate, endDate };
  }, [birthDate]);

  // Helper function to calculate position percentage for any date
  const calculatePosition = useMemo(() => {
    return (date: Date): number => {
      const totalMs =
        timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
      const dateMs = date.getTime() - timelineBounds.birthDate.getTime();
      return Math.max(0, Math.min(100, (dateMs / totalMs) * 100));
    };
  }, [timelineBounds]);

  // Calculate current position as percentage (0-100)
  const currentPosition = useMemo(() => {
    return calculatePosition(selectedDate);
  }, [selectedDate, calculatePosition]);

  // Convert slider value (0-100) to date
  const sliderValueToDate = useMemo(() => {
    return (value: number): Date => {
      const totalMs =
        timelineBounds.endDate.getTime() - timelineBounds.birthDate.getTime();
      const targetMs = (value / 100) * totalMs;
      return new Date(timelineBounds.birthDate.getTime() + targetMs);
    };
  }, [timelineBounds]);

  // Find active Mahadasha for the selected date
  const activeMahadasha = useMemo(() => {
    return findActiveMahadasha(mahadashaPeriods, selectedDate);
  }, [mahadashaPeriods, selectedDate]);

  // Calculate all periods for selected date
  const selectedDatePeriods = useMemo(() => {
    const mahadasha = activeMahadasha;
    const antardasha = mahadasha
      ? findActiveAntardasha(mahadasha, selectedDate)
      : undefined;
    const pratyantardasha = antardasha
      ? findActivePratyantardasha(antardasha, selectedDate)
      : undefined;
    const sookshma = pratyantardasha
      ? findActiveSookshma(pratyantardasha, selectedDate)
      : undefined;

    return { mahadasha, antardasha, pratyantardasha, sookshma };
  }, [activeMahadasha, selectedDate]);

  return {
    timelineBounds,
    currentPosition,
    calculatePosition,
    sliderValueToDate,
    activeMahadasha,
    selectedDatePeriods,
  };
}
