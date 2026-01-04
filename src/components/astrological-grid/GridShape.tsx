/**
 * GridShape Component
 * Renders triangle or rectangle shapes with consolidated event handling
 */

import { memo } from 'react';
import type { AreaConfig } from './types';

interface GridShapeProps {
  config: AreaConfig;
  shapeClasses: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

/**
 * Memoized GridShape component
 * Only re-renders when its props change
 */
export const GridShape = memo(function GridShape({
  config,
  shapeClasses,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: GridShapeProps) {
  const commonProps = {
    className: shapeClasses,
    strokeLinejoin: 'miter' as const,
    strokeLinecap: 'square' as const,
    onMouseEnter,
    onMouseLeave,
    onClick,
  };

  if (config.shape === 'triangle') {
    return <polygon points={config.points} {...commonProps} />;
  }

  // Square or rectangle
  const x = config.position.x - (config.width || 100) / 2;
  const y = config.position.y - (config.height || 100) / 2;

  return (
    <rect
      x={x}
      y={y}
      width={config.width || 100}
      height={config.height || 100}
      {...commonProps}
    />
  );
});
