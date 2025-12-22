import type { AreaConfig } from './types';

// Grid is 300x300 viewBox, divided into 3x3 grid (100x100 cells)
// Each cell can contain triangles or squares
export const GRID_CONFIG: AreaConfig[] = [
  // Area 1 - Square (top-center)
  {
    id: 1,
    shape: 'square',
    points: '',
    position: { x: 150, y: 33.5 },
    width: 100,
    height: 100,
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
    position: { x: 50, y: 133.5 },
    width: 100,
    height: 100,
  },

  // Area 5 - Triangle (bottom-left, upper triangle)
  {
    id: 5,
    shape: 'triangle',
    points: '0,233 100,233 100,300',
    position: { x: 67, y: 255 }, // Centroid
  },

  // Area 6 - Triangle (bottom-left, lower triangle)
  {
    id: 6,
    shape: 'triangle',
    points: '0,233 0,300 100,300',
    position: { x: 33, y: 278 }, // Centroid
  },

  // Area 7 - Square (bottom-center)
  {
    id: 7,
    shape: 'square',
    points: '',
    position: { x: 150, y: 233.5 },
    width: 100,
    height: 100,
  },

  // Area 8 - Triangle (bottom-right, lower triangle)
  {
    id: 8,
    shape: 'triangle',
    points: '300,233 200,300 300,300',
    position: { x: 267, y: 278 }, // Centroid
  },

  // Area 9 - Triangle (bottom-right, upper triangle)
  {
    id: 9,
    shape: 'triangle',
    points: '200,233 300,233 200,300',
    position: { x: 233, y: 255 }, // Centroid
  },

  // Area 10 - Square (middle-right)
  {
    id: 10,
    shape: 'square',
    points: '',
    position: { x: 250, y: 133.5 },
    width: 100,
    height: 100,
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

  // Center - Fixed '0' (non-interactive)
  {
    id: 0,
    shape: 'square',
    points: '',
    position: { x: 150, y: 133.5 },
    width: 100,
    height: 100,
    isCenter: true,
  },
];
