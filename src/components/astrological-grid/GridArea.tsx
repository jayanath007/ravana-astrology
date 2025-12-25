import { useState, useMemo } from "react";
import type { AreaConfig } from "./types";
import { cn } from "@/lib/utils";
import { getZodiacSignByAreaId } from "./zodiac-config";
import { getPlanetColor } from "@/utils/planet-colors";
import { getZodiacNameSinhala } from "@/utils/zodiac-names";
import type { PlanetSign } from "@/components/birth-details/BirthDetailsForm";
import { TAILWIND_CLASSES, INTERACTION_COLORS } from "@/styles/theme-colors";

interface GridAreaProps {
  config: AreaConfig;
  letter: string[];
  offsetValue: number;
  planetSigns?: PlanetSign[];
  isSelected?: boolean;
  onSelect?: (areaId: number) => void;
  aspectingPlanets?: string[];
  highlightedPlanet?: string | null;
}

export function GridArea({
  config,
  letter,
  offsetValue,
  planetSigns,
  isSelected = false,
  onSelect,
  aspectingPlanets = [],
  highlightedPlanet = null,
}: GridAreaProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate zodiac sign: getZodiacSignByAreaId((x - 1) + currentValue)
  // where x = offsetValue, currentValue = area ID (0-12)
  const calculatedZodiacSign = useMemo(() => {
    const signId = (offsetValue - 1 + config.id) % 12;
    // Handle 0 case: if result is 0, it should be 12
    const finalSignId = signId === 0 ? 12 : signId;
    return getZodiacSignByAreaId(finalSignId);
  }, [offsetValue, config.id]);

  const hasLetters = letter.length > 0;

  const handleClick = () => {
    if (!config.isCenter && onSelect) {
      onSelect(config.id);
    }
  };

  const shapeClasses = cn(
    "transition-all duration-200",
    TAILWIND_CLASSES.grid.borderWidth,
    config.isCenter
      ? cn(
          TAILWIND_CLASSES.grid.fillDefault,
          TAILWIND_CLASSES.grid.borderDefault
        )
      : cn(
          TAILWIND_CLASSES.grid.fillDefault,
          "cursor-pointer",
          // Selected state (persistent highlight) - green fill and stroke
          isSelected &&
            cn(
              TAILWIND_CLASSES.grid.fillSelected,
              TAILWIND_CLASSES.grid.borderSelected
            ),
          // Hover state (temporary highlight) - only if not already selected
          !isSelected &&
            isHovered &&
            cn(
              TAILWIND_CLASSES.grid.fillHover,
              TAILWIND_CLASSES.grid.borderHover
            ),
          // Default state - dark green border
          !isSelected && !isHovered && TAILWIND_CLASSES.grid.borderDefault
        )
  );

  const renderShape = () => {
    if (config.shape === "triangle") {
      return (
        <polygon
          points={config.points}
          className={shapeClasses}
          strokeLinejoin="miter"
          strokeLinecap="square"
          onMouseEnter={() => !config.isCenter && setIsHovered(true)}
          onMouseLeave={() => !config.isCenter && setIsHovered(false)}
          onClick={handleClick}
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
        />
      );
    }
  };

  return (
    <>
      <g>
        {renderShape()}

        {/* Display zodiac name in center - rendered first (behind watermark) */}
        {config.isCenter && (
          <text
            x={config.position.x}
            y={config.position.y + 20}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none text-sm font-bold text-neutral-900 dark:text-neutral-100"
          >
            {getZodiacNameSinhala((offsetValue - 1 + config.id) % 12 || 12)}
          </text>
        )}
        {config.isCenter && (
          <text
            x={config.position.x}
            y={config.position.y + 20 + 18}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none text-sm font-bold text-neutral-900 dark:text-neutral-100"
          >
            නවංශකය
          </text>
        )}
        {/* Zodiac sign watermark - rendered after text (on top) */}
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
                  viewBox={calculatedZodiacSign.svgViewBox || "0 0 100 100"}
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
                  viewBox={calculatedZodiacSign.svgViewBox || "0 0 100 100"}
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

        {/* Display letters/planets */}
        {hasLetters && !config.isCenter && (
          <>
            {/* Non-center areas: render each planet/letter with individual color */}
            {/* Support up to 8 characters with multi-line layout */}
            {(() => {
              const itemCount = letter.length;

              // Determine characters per row and font size based on count
              // Reduced charsPerRow for more vertical stacking
              let charsPerRow = 2;
              let fontSize = "text-xs"; // 12px
              let lineHeight = 14;
              let charSpacing = 14;

              if (itemCount <= 3) {
                charsPerRow = 2;
                fontSize = "text-xs";
                lineHeight = 14;
                charSpacing = 14;
              } else if (itemCount <= 6) {
                charsPerRow = 2;
                fontSize = "text-[10px]";
                lineHeight = 12;
                charSpacing = 12;
              } else {
                // 7-8 characters
                charsPerRow = 3;
                fontSize = "text-[9px]";
                lineHeight = 11;
                charSpacing = 11;
              }

              const numRows = Math.ceil(itemCount / charsPerRow);
              const startY =
                config.position.y - ((numRows - 1) * lineHeight) / 2;

              return letter.map((item, index) => {
                // Find the original sign for this planet
                const planetData = planetSigns?.find(
                  (ps) => ps.planet === item
                );
                const color = planetData
                  ? getPlanetColor(item, planetData.sign)
                  : undefined;

                // Calculate row and column for this item
                const row = Math.floor(index / charsPerRow);
                const col = index % charsPerRow;
                const charsInThisRow = Math.min(
                  charsPerRow,
                  itemCount - row * charsPerRow
                );

                // Calculate x position (centered within the row)
                const xOffset = (col - (charsInThisRow - 1) / 2) * charSpacing;
                const yOffset = row * lineHeight;
                const isAspecting = aspectingPlanets.includes(item);

                // Check if this planet is the highlighted ruling planet
                const isHighlighted = highlightedPlanet === item;

                // Adjust font size if this planet is highlighted (increase by 7 units)
                let adjustedFontSize = fontSize;
                if (isHighlighted) {
                  if (fontSize === "text-xs") {
                    adjustedFontSize = "text-[19px]"; // 12px → 19px
                  } else if (fontSize === "text-[10px]") {
                    adjustedFontSize = "text-[17px]"; // 10px → 17px
                  } else if (fontSize === "text-[9px]") {
                    adjustedFontSize = "text-[16px]"; // 9px → 16px
                  }
                }

                return (
                  <g key={`${item}-${index}`}>
                    {/* Highlight background square for aspecting planet (orange) */}
                    {isAspecting && (
                      <rect
                        x={
                          config.position.x +
                          xOffset -
                          parseInt(INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE) / 2
                        }
                        y={
                          startY +
                          yOffset -
                          parseInt(INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE) / 2
                        }
                        width={INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE}
                        height={INTERACTION_COLORS.PLANET_HIGHLIGHT_SIZE}
                        className={TAILWIND_CLASSES.aspectingHighlight}
                        opacity={INTERACTION_COLORS.ASPECTING_HIGHLIGHT_OPACITY}
                      />
                    )}
                    <text
                      x={config.position.x + xOffset}
                      y={startY + yOffset}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={`pointer-events-none font-semibold select-none ${adjustedFontSize}`}
                      style={{ fill: color }}
                    >
                      {item}
                    </text>
                  </g>
                );
              });
            })()}
          </>
        )}
      </g>
    </>
  );
}
