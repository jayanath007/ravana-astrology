import type { BirthDetails } from '@/types/birthChart';

/**
 * Storage key for birth details in sessionStorage
 */
const STORAGE_KEY = 'ravana-astrology-birth-details';

/**
 * Save birth details to sessionStorage
 *
 * @param details - The birth details to save
 *
 * @example
 * saveBirthDetails({
 *   birthDate: '1990-01-01',
 *   birthTime: '12:00',
 *   latitude: 40.7128,
 *   longitude: -74.0060,
 *   timeZoneId: 'America/New_York'
 * });
 */
export function saveBirthDetails(details: BirthDetails): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch (err) {
    console.error('Failed to save to sessionStorage:', err);
    // Silently fail - storage errors shouldn't break the app
  }
}

/**
 * Load birth details from sessionStorage
 *
 * @returns The saved birth details, or null if not found or invalid
 *
 * @example
 * const savedDetails = loadBirthDetails();
 * if (savedDetails) {
 *   // Use saved details
 * }
 */
export function loadBirthDetails(): BirthDetails | null {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (!data) {
      return null;
    }

    const parsed = JSON.parse(data);

    // Basic validation to ensure it's a valid BirthDetails object
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'birthDate' in parsed &&
      'birthTime' in parsed &&
      'latitude' in parsed &&
      'longitude' in parsed &&
      'timeZoneId' in parsed
    ) {
      return parsed as BirthDetails;
    }

    return null;
  } catch (err) {
    console.error('Failed to load from sessionStorage:', err);
    return null;
  }
}

/**
 * Clear birth details from sessionStorage
 *
 * @example
 * clearBirthDetails(); // Clear stored data
 */
export function clearBirthDetails(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear sessionStorage:', err);
    // Silently fail - storage errors shouldn't break the app
  }
}
