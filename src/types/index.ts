export type Tool = 'move' | 'text' | 'rectangle' | 'circle' | 'image' | null;

export type Element = {
  id: number;
  type: 'text' | 'rectangle' | 'circle' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  content?: string;
  fontSize?: number;
  color?: string;
  src?: string;
};