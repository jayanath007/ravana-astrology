/**
 * ZodiacWatermark Component
 * Renders zodiac sign watermarks with light/dark mode support
 * Eliminates duplication of SVG/image/symbol rendering
 */

import { memo } from 'react';
import type { ZodiacSign } from './zodiac-config';
import {
  ZODIAC_ICON_SIZE,
  ZODIAC_ICON_OFFSET,
  ZODIAC_IMAGE_SIZE,
  ZODIAC_IMAGE_OFFSET,
  ZODIAC_OPACITY_CENTER,
  ZODIAC_OPACITY_NON_CENTER,
  ZODIAC_IMAGE_OPACITY,
} from './grid-constants';

interface ZodiacWatermarkProps {
  zodiacSign: ZodiacSign;
  x: number;
  y: number;
  isCenter?: boolean;
}

/**
 * Memoized ZodiacWatermark component
 * Only re-renders when its props change
 */
export const ZodiacWatermark = memo(function ZodiacWatermark({
  zodiacSign,
  x,
  y,
  isCenter = false,
}: ZodiacWatermarkProps) {
  const opacity = isCenter ? ZODIAC_OPACITY_CENTER : ZODIAC_OPACITY_NON_CENTER;


  // SVG Path rendering
  if (zodiacSign.svgPath) {
      const imageOffset = isCenter ? y - ZODIAC_ICON_OFFSET-20 : y - ZODIAC_ICON_OFFSET;

    return (
      <>
        {/* Light mode */}
        <svg
          x={x - ZODIAC_ICON_OFFSET}
          y={imageOffset }
          width={ZODIAC_ICON_SIZE}
          height={ZODIAC_ICON_SIZE}
          viewBox={zodiacSign.svgViewBox || '0 0 100 100'}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          opacity={opacity}
          className="pointer-events-none select-none dark:hidden"
        >
          <path fill={zodiacSign.color} d={zodiacSign.svgPath} />
        </svg>

        {/* Dark mode */}
        <svg
          x={x - ZODIAC_ICON_OFFSET}
          y={y - ZODIAC_ICON_OFFSET}
          width={ZODIAC_ICON_SIZE}
          height={ZODIAC_ICON_SIZE}
          viewBox={zodiacSign.svgViewBox || '0 0 100 100'}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          opacity={opacity}
          className="pointer-events-none select-none hidden dark:block"
        >
          <path fill={zodiacSign.darkColor} d={zodiacSign.svgPath} />
        </svg>
      </>
    );
  }

  // Image rendering
  if (zodiacSign.imageUrl) {
    return (
      <image
        href={zodiacSign.imageUrl}
        x={x - ZODIAC_IMAGE_OFFSET}
        y={y - ZODIAC_IMAGE_OFFSET }
        width={ZODIAC_IMAGE_SIZE}
        height={ZODIAC_IMAGE_SIZE}
        opacity={ZODIAC_IMAGE_OPACITY}
        className="pointer-events-none select-none"
      />
    );
  }

  // Unicode symbol fallback
  return (
    <>
      {/* Light mode */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="pointer-events-none select-none text-5xl dark:hidden"
        style={{ fill: zodiacSign.color }}
        opacity={ZODIAC_OPACITY_NON_CENTER}
      >
        {zodiacSign.symbol}
      </text>

      {/* Dark mode */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="pointer-events-none select-none text-5xl hidden dark:block"
        style={{ fill: zodiacSign.darkColor }}
        opacity={ZODIAC_OPACITY_NON_CENTER}
      >
        {zodiacSign.symbol}
      </text>
    </>
  );
});
