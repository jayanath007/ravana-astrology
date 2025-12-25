/**
 * Zodiac Calculations
 * Shared utilities for zodiac sign calculations across components
 */

/**
 * Calculate zodiac sign ID based on area ID and offset value
 * Used consistently across GridArea and AstrologicalGrid components
 *
 * @param areaId - The area ID (0-12)
 * @param offsetValue - The zodiac offset value
 * @returns The zodiac sign ID (1-12)
 */
export function calculateZodiacSignId(areaId: number, offsetValue: number): number {
  const signId = (offsetValue - 1 + areaId) % 12;
  return signId === 0 ? 12 : signId;
}

/**
 * Calculate area ID from zodiac sign and offset
 * Inverse operation of calculateZodiacSignId
 *
 * @param sign - The zodiac sign number (1-12)
 * @param offsetValue - The zodiac offset value
 * @returns The area ID (1-12)
 */
export function calculateAreaIdFromSign(sign: number, offsetValue: number): number {
  let areaId = sign - offsetValue + 1;

  // Normalize to 1-12 range
  while (areaId <= 0) {
    areaId += 12;
  }
  while (areaId > 12) {
    areaId -= 12;
  }

  return areaId;
}
