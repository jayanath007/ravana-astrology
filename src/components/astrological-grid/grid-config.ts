import type { AreaConfig } from './types';

// Grid is 300x300 viewBox, divided into 3x3 grid (100x100 cells)
// Row 1: y=0-100, Row 2: y=100-200, Row 3: y=200-300
// Col 1: x=0-100, Col 2: x=100-200, Col 3: x=200-300
export const GRID_CONFIG: AreaConfig[] = [
  // Area 1 - Square (top-center, row 1 col 2)
  {
    id: 1,
    shape: 'square',
    points: '',
    position: { x: 150, y: 50 },
    width: 100,
    height: 100,
  },

  // Area 2 - Triangle (top-left upper, row 1 col 1)
  {
    id: 2,
    shape: 'triangle',
    points: '0,0 100,0 100,100',
    position: { x: 67, y: 25 }, // Centroid
  },

  // Area 3 - Triangle (top-left lower, row 1 col 1)
  {
    id: 3,
    shape: 'triangle',
    points: '0,0 0,100 100,100',
    position: { x: 25, y: 67 }, // Centroid
  },

  // Area 4 - Square (middle-left, row 2 col 1)
  {
    id: 4,
    shape: 'square',
    points: '',
    position: { x: 50, y: 150 },
    width: 100,
    height: 100,
  },

  // Area 5 - Triangle (bottom-left upper, row 3 col 1)
  {
    id: 5,
    shape: 'triangle',
    points: '0,300 100,200  100,300',
    position: { x: 67, y: 267 }, // Centroid
  },

  // Area 6 - Triangle (bottom-left lower, row 3 col 1)
  {
    id: 6,
    shape: 'triangle',
    points: '0,300 0,200 100,200',
    position: { x: 30, y: 225 }, // Centroid
  },

  // Area 7 - Square (bottom-center, row 3 col 2)
  {
    id: 7,
    shape: 'square',
    points: '',
    position: { x: 150, y: 250 },
    width: 100,
    height: 100,
  },

   // Area 8 - Triangle (bottom-right lower, row 3 col 3)
  {
    id: 8,
    shape: 'triangle',
    points: '200,200 200,300 300,300',
    position: { x: 225, y: 267 }, // Centroid
  },

  // Area 9 - Triangle (bottom-right upper, row 3 col 3)
  {
    id: 9,
    shape: 'triangle',
    points: '200,200 300,200 300,300',
    position: { x: 267, y: 225 }, // Centroid
  },




  // Area 10 - Square (middle-right, row 2 col 3)
  {
    id: 10,
    shape: 'square',
    points: '',
    position: { x: 250, y: 150 },
    width: 100,
    height: 100,
   
  },

  // Area 11 - Triangle (top-right lower, row 1 col 3)
  {
    id: 11,
    shape: 'triangle',
    points: '300,0 200,100 300,100',
    position: { x: 267, y: 67 }, // Centroid
 
  },

  // Area 12 - Triangle (top-right upper, row 1 col 3)
  {
    id: 12,
    shape: 'triangle',
    points: '200,0 300,0 200,100',
    position: { x: 225, y: 25 }, // Centroid
  },

  // Center - Fixed '0' (non-interactive, row 2 col 2)
  {
    id: 13,
    shape: 'square',
    points: '',
    position: { x: 150, y: 150 },
    width: 100,
    height: 100,
    isCenter: true,
  },
];
