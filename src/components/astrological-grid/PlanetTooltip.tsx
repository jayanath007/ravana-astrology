/**
 * PlanetTooltip Component
 * Displays detailed planet information on hover for SVG elements
 */

import { useState } from 'react';
import { createPortal } from 'react-dom';

interface PlanetTooltipProps {
  planet: string;
  x: number;
  y: number;
  children: React.ReactNode;
  enabled?: boolean;
}

interface PlanetDetails {
  nakshatra: string;
  padaya: string;
  navaAnka: number;
}

// TODO: Replace with actual data from birth chart calculations
const PLANET_DETAILS_MOCK: Record<string, PlanetDetails> = {
  ච: { nakshatra: 'Ashwini', padaya: '2nd Padaya', navaAnka: 5 },
  බු: { nakshatra: 'Bharani', padaya: '1st Padaya', navaAnka: 3 },
  ශු: { nakshatra: 'Krittika', padaya: '3rd Padaya', navaAnka: 7 },
  ග: { nakshatra: 'Rohini', padaya: '4th Padaya', navaAnka: 2 },
  රා: { nakshatra: 'Mrigashira', padaya: '2nd Padaya', navaAnka: 6 },
  ශ: { nakshatra: 'Ardra', padaya: '1st Padaya', navaAnka: 4 },
  කෙ: { nakshatra: 'Punarvasu', padaya: '3rd Padaya', navaAnka: 8 },
  ර: { nakshatra: 'Pushya', padaya: '2nd Padaya', navaAnka: 1 },
};

export function PlanetTooltip({ planet, x, y, children, enabled = false }: PlanetTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Get mock details for this planet (default values if not found)
  const details = PLANET_DETAILS_MOCK[planet] || {
    nakshatra: 'Ashwini',
    padaya: '2nd Padaya',
    navaAnka: 5,
  };

  const handleMouseEnter = (e: React.MouseEvent<SVGGElement>) => {
    if (!enabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <g
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: enabled ? 'pointer' : 'default' }}
      >
        {children}
      </g>

      {enabled && isVisible &&
        createPortal(
          <div
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-md p-4 pointer-events-none"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 99999,
            }}
          >
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-[180px] text-[22px]">
                  ග්‍රහ නක්ෂත්‍ර:
                </span>
                <span className="text-gray-900 dark:text-gray-100 text-[22px]">
                  {details.nakshatra}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-[180px] text-[22px]">
                  ග්‍රහ පාදය:
                </span>
                <span className="text-gray-900 dark:text-gray-100 text-[22px]">
                  {details.padaya}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-[180px] text-[22px]">
                  නව අංක:
                </span>
                <span className="text-gray-900 dark:text-gray-100 text-[22px]">
                  {details.navaAnka}
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
