import { useState, useMemo } from 'react';
import type { AreaConfig } from './types';
import { LetterPicker } from './LetterPicker';
import { cn } from '@/lib/utils';
import { getZodiacSignByAreaId } from './zodiac-config';
import { getPlanetColor } from '@/utils/planet-colors';
import type { PlanetSign } from '@/components/birth-details/BirthDetailsForm';

interface GridAreaProps {
  config: AreaConfig;
  letter: string[];
  onLetterSelect: (areaId: number, letter: string | null) => void;
  offsetValue: number;
  planetSigns?: PlanetSign[];
}

export function GridArea({ config, letter, onLetterSelect, offsetValue, planetSigns }: GridAreaProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Calculate zodiac sign: getZodiacSignByAreaId((x - 1) + currentValue)
  // where x = offsetValue, currentValue = area ID (0-12)
  const calculatedZodiacSign = useMemo(() => {
    const signId = ((offsetValue - 1) + config.id) % 12;
    // Handle 0 case: if result is 0, it should be 12
    const finalSignId = signId === 0 ? 12 : signId;
    return getZodiacSignByAreaId(finalSignId);
  }, [offsetValue, config.id]);

  const handleClick = () => {
    if (!config.isCenter) {
      setIsPickerOpen(true);
    }
  };

  const handleLetterSelect = (selectedLetter: string | null) => {
    onLetterSelect(config.id, selectedLetter);
  };

  const hasLetters = letter.length > 0;

  const shapeClasses = cn(
    'transition-all duration-200',
    isHovered && !config.isCenter ? 'stroke-[3]' : 'stroke-2',
    config.isCenter
      ? 'fill-neutral-100 dark:fill-neutral-800 stroke-neutral-400 dark:stroke-neutral-600'
      : cn(
          'stroke-neutral-400 dark:stroke-neutral-600',
          hasLetters
            ? 'fill-blue-100 dark:fill-blue-900'
            : 'fill-neutral-100 dark:fill-neutral-800',
          isHovered && !config.isCenter && 'fill-neutral-200 dark:fill-neutral-700 stroke-neutral-800 dark:stroke-neutral-300',
          !config.isCenter && 'cursor-pointer'
        )
  );

  const renderShape = () => {
    if (config.shape === 'triangle') {
      return (
        <polygon
          points={config.points}
          className={shapeClasses}
          strokeLinejoin="miter"
          strokeLinecap="square"
          onMouseEnter={() => !config.isCenter && setIsHovered(true)}
          onMouseLeave={() => !config.isCenter && setIsHovered(false)}
          onClick={handleClick}
          role={config.isCenter ? undefined : 'button'}
          aria-label={config.isCenter ? 'Center area with 0' : `Area ${config.id}${hasLetters ? `: ${letter.join('')}` : ''}`}
        />
      );
    } else {
      // Square or rectangle
      const x = config.position.x - (config.width || 100) / 2;
      const y = config.position.y - (config.height || 100) / 2;

      return (
        <rect
          x={x}
          y={y}
          width={config.width || 100}
          height={config.height || 100}
          className={shapeClasses}
          strokeLinejoin="miter"
          strokeLinecap="square"
          onMouseEnter={() => !config.isCenter && setIsHovered(true)}
          onMouseLeave={() => !config.isCenter && setIsHovered(false)}
          onClick={handleClick}
          role={config.isCenter ? undefined : 'button'}
          aria-label={config.isCenter ? 'Center area with 0' : `Area ${config.id}${hasLetters ? `: ${letter.join('')}` : ''}`}
        />
      );
    }
  };

  return (
    <>
      <g>
        {renderShape()}

        {/* Zodiac sign - rendered below text */}
        {calculatedZodiacSign && (
          <>
            {calculatedZodiacSign.svgPath ? (
              // Inline SVG with path data and dynamic colors
              <>
                {/* Light mode SVG */}
                <svg
                  x={config.position.x - 17.5}
                  y={config.position.y - 17.5}
                  width={35}
                  height={35}
                  viewBox={calculatedZodiacSign.svgViewBox || '0 0 100 100'}
                  preserveAspectRatio="xMidYMid meet"
                  overflow="visible"
                  opacity={config.isCenter ? 1 : 0.25}
                  className="pointer-events-none select-none dark:hidden"
                >
                  <path
                    fill={calculatedZodiacSign.color}
                    d={calculatedZodiacSign.svgPath}
                  />
                </svg>

                {/* Dark mode SVG */}
                <svg
                  x={config.position.x - 17.5}
                  y={config.position.y - 17.5}
                  width={35}
                  height={35}
                  viewBox={calculatedZodiacSign.svgViewBox || '0 0 100 100'}
                  preserveAspectRatio="xMidYMid meet"
                  overflow="visible"
                  opacity={config.isCenter ? 1 : 0.25}
                  className="pointer-events-none select-none hidden dark:block"
                >
                  <path
                    fill={calculatedZodiacSign.darkColor}
                    d={calculatedZodiacSign.svgPath}
                  />
                </svg>
              </>
            ) : calculatedZodiacSign.imageUrl ? (
              // Use image if imageUrl is provided (configurable for future)
              <image
                href={calculatedZodiacSign.imageUrl}
                x={config.position.x - 30}
                y={config.position.y - 30}
                width={60}
                height={60}
                opacity={0.15}
                className="pointer-events-none select-none"
              />
            ) : (
              // Use Unicode symbol as fallback watermark with unique color per sign
              <>
                {/* Light mode watermark */}
                <text
                  x={config.position.x}
                  y={config.position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none text-5xl dark:hidden"
                  style={{ fill: calculatedZodiacSign.color }}
                  opacity={0.25}
                >
                  {calculatedZodiacSign.symbol}
                </text>
                {/* Dark mode watermark */}
                <text
                  x={config.position.x}
                  y={config.position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none text-5xl hidden dark:block"
                  style={{ fill: calculatedZodiacSign.darkColor }}
                  opacity={0.25}
                >
                  {calculatedZodiacSign.symbol}
                </text>
              </>
            )}
          </>
        )}

        {/* Display area ID number for non-center areas */}
        {!config.isCenter && (
          <text
            x={config.position.x}
            y={hasLetters ? config.position.y - 12 : config.position.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none font-semibold select-none text-sm fill-neutral-500 dark:fill-neutral-400"
          >
            {config.id}
          </text>
        )}

        {/* Display letters/planets or ID for center */}
        {(hasLetters || config.isCenter) && (
          <>
            {config.isCenter ? (
              // Center area displays ID
              <text
                x={config.position.x}
                y={config.position.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none font-semibold select-none text-sm fill-neutral-500 dark:fill-neutral-400"
              >
                {config.id}
              </text>
            ) : (
              // Non-center areas: render each planet/letter with individual color
              letter.map((item, index) => {
                // Find the original sign for this planet
                const planetData = planetSigns?.find(ps => ps.planet === item);
                const color = planetData
                  ? getPlanetColor(item, planetData.sign)
                  : undefined;

                return (
                  <text
                    key={`${item}-${index}`}
                    x={config.position.x + (index * 15) - ((letter.length - 1) * 7.5)}
                    y={config.position.y + 10}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none font-semibold select-none text-base"
                    style={{ fill: color }}
                  >
                    {item}
                  </text>
                );
              })
            )}
          </>
        )}
      </g>

      {!config.isCenter && (
        <LetterPicker
          open={isPickerOpen}
          onOpenChange={setIsPickerOpen}
          currentLetters={letter}
          onSelect={handleLetterSelect}
        >
          <button
            className="absolute opacity-0 pointer-events-none"
            style={{
              left: `${config.position.x}px`,
              top: `${config.position.y}px`,
            }}
            aria-hidden="true"
          />
        </LetterPicker>
      )}
    </>
  );
}
