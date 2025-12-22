import { useState } from 'react';
import type { AreaConfig } from './types';
import { LetterPicker } from './LetterPicker';
import { cn } from '@/lib/utils';

interface GridAreaProps {
  config: AreaConfig;
  letter: string[];
  onLetterSelect: (areaId: number, letter: string | null) => void;
}

export function GridArea({ config, letter, onLetterSelect }: GridAreaProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

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
      ? 'fill-amber-200 dark:fill-amber-800 stroke-amber-600 dark:stroke-amber-400'
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

  const displayLetters = config.isCenter ? config.id.toString() : letter.join('');

  return (
    <>
      <g>
        {renderShape()}

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

        {/* Display letters or ID for center */}
        {(hasLetters || config.isCenter) && (
          <text
            x={config.position.x}
            y={config.isCenter ? config.position.y : config.position.y + 10}
            textAnchor="middle"
            dominantBaseline="central"
            className={cn(
              'pointer-events-none font-bold select-none',
              config.isCenter
                ? 'text-5xl fill-amber-900 dark:fill-amber-100'
                : 'text-base fill-neutral-900 dark:fill-neutral-100'
            )}
          >
            {displayLetters}
          </text>
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
