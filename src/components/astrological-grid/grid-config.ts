import type { AreaConfig } from './types';
import { getZodiacSignByAreaId } from './zodiac-config';

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
    zodiacSign: getZodiacSignByAreaId(1),
  },

  // Area 2 - Triangle (top-left upper, row 1 col 1)
  {
    id: 2,
    shape: 'triangle',
    points: '0,0 100,0 100,100',
    position: { x: 67, y: 33 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(2),
  },

  // Area 3 - Triangle (top-left lower, row 1 col 1)
  {
    id: 3,
    shape: 'triangle',
    points: '0,0 0,100 100,100',
    position: { x: 33, y: 67 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(3),
  },

  // Area 4 - Square (middle-left, row 2 col 1)
  {
    id: 4,
    shape: 'square',
    points: '',
    position: { x: 50, y: 150 },
    width: 100,
    height: 100,
    zodiacSign: getZodiacSignByAreaId(4),
  },

  // Area 5 - Triangle (bottom-left upper, row 3 col 1)
  {
    id: 5,
    shape: 'triangle',
    points: '0,300 100,200  100,300',
    position: { x: 67, y: 267 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(5),
  },

  // Area 6 - Triangle (bottom-left lower, row 3 col 1)
  {
    id: 6,
    shape: 'triangle',
    points: '0,300 0,200 100,200',
    position: { x: 33, y: 233 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(6),
  },

  // Area 7 - Square (bottom-center, row 3 col 2)
  {
    id: 7,
    shape: 'square',
    points: '',
    position: { x: 150, y: 250 },
    width: 100,
    height: 100,
    zodiacSign: getZodiacSignByAreaId(7),
  },

   // Area 8 - Triangle (bottom-right lower, row 3 col 3)
  {
    id: 8,
    shape: 'triangle',
    points: '200,200 200,300 300,300',
    position: { x: 223, y: 267 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(8),
  },

  // Area 9 - Triangle (bottom-right upper, row 3 col 3)
  {
    id: 9,
    shape: 'triangle',
    points: '200,200 300,200 300,300',
    position: { x: 267, y: 223 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(9),
  },




  // Area 10 - Square (middle-right, row 2 col 3)
  {
    id: 10,
    shape: 'square',
    points: '',
    position: { x: 250, y: 150 },
    width: 100,
    height: 100,
    zodiacSign: getZodiacSignByAreaId(10),
  },

  // Area 11 - Triangle (top-right lower, row 1 col 3)
  {
    id: 11,
    shape: 'triangle',
    points: '300,0 200,100 300,100',
    position: { x: 267, y: 67 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(11),
  },

  // Area 12 - Triangle (top-right upper, row 1 col 3)
  {
    id: 12,
    shape: 'triangle',
    points: '200,0 300,0 200,100',
    position: { x: 233, y: 33 }, // Centroid
    zodiacSign: getZodiacSignByAreaId(12),
  },

  // Center - Fixed '0' (non-interactive, row 2 col 2)
  {
    id: 0,
    shape: 'square',
    points: '',
    position: { x: 150, y: 150 },
    width: 100,
    height: 100,
    isCenter: true,
    zodiacSign: getZodiacSignByAreaId(1),
  },
];
