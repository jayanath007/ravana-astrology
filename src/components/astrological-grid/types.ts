export type ShapeType = 'triangle' | 'square' | 'rectangle';

export interface GridState {
  [areaId: number]: string[]; // areaId -> array of letters mapping
}

export interface AreaConfig {
  id: number;
  shape: ShapeType;
  points: string;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  isCenter?: boolean;
}
