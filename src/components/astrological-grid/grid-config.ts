import type { AreaConfig } from './types';

// Grid is 300x300 viewBox, divided into 3x3 grid (100x100 cells)
// Each cell can contain triangles or squares
export const GRID_CONFIG: AreaConfig[] = [
  // Area 1 - Rectangle (top-center, spans 2 rows)
  {
    id: 1,
    shape: 'rectangle',
    points: '', // Will use rect element
    position: { x: 150, y: 67 }, // Center of rectangle
    width: 100,
    height: 134,
  },

  // Area 2 - Triangle (top-left, upper triangle)
  {
    id: 2,
    shape: 'triangle',
    points: '0,0 100,0 100,67',
    position: { x: 67, y: 22 }, // Centroid
  },

  // Area 3 - Triangle (top-left, lower triangle)
  {
    id: 3,
    shape: 'triangle',
    points: '0,0 0,67 100,67',
    position: { x: 33, y: 45 }, // Centroid
  },

  // Area 4 - Square (middle-left)
  {
    id: 4,
    shape: 'square',
    points: '',
    position: { x: 50, y: 117 },
    width: 100,
    height: 66,
  },

  // Area 5 - Triangle (bottom-left, upper triangle)
  {
    id: 5,
    shape: 'triangle',
    points: '0,183 100,183 0,233',
    position: { x: 33, y: 200 }, // Centroid
  },

  // Area 6 - Square (bottom-left, lower square)
  {
    id: 6,
    shape: 'square',
    points: '',
    position: { x: 50, y: 267 },
    width: 100,
    height: 67,
  },

  // Area 7 - Square (bottom-center, spans 2 rows)
  {
    id: 7,
    shape: 'square',
    points: '',
    position: { x: 150, y: 233 },
    width: 100,
    height: 134,
  },

  // Area 8 - Square (bottom-right, lower square)
  {
    id: 8,
    shape: 'square',
    points: '',
    position: { x: 250, y: 267 },
    width: 100,
    height: 67,
  },

  // Area 9 - Triangle (bottom-right, upper triangle)
  {
    id: 9,
    shape: 'triangle',
    points: '300,183 200,233 300,233',
    position: { x: 267, y: 216 }, // Centroid
  },

  // Area 10 - Square (middle-right)
  {
    id: 10,
    shape: 'square',
    points: '',
    position: { x: 250, y: 117 },
    width: 100,
    height: 66,
  },

  // Area 11 - Triangle (top-right, lower triangle)
  {
    id: 11,
    shape: 'triangle',
    points: '300,0 200,67 300,67',
    position: { x: 267, y: 45 }, // Centroid
  },

  // Area 12 - Triangle (top-right, upper triangle)
  {
    id: 12,
    shape: 'triangle',
    points: '200,0 300,0 200,67',
    position: { x: 233, y: 22 }, // Centroid
  },

  // Center - Fixed 'M' (non-interactive)
  {
    id: 0,
    shape: 'square',
    points: '',
    position: { x: 150, y: 150 },
    width: 100,
    height: 66,
    isCenter: true,
  },
];
