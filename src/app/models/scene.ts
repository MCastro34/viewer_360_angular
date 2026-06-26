import { View360 } from './media';

export interface Scene {
  id: string;
  name: string;
  description: string;
  type: string;
  data: SceneData;
}

export enum SceneTypes {
  PANORAMA = 'panorama',
  VIDEO = 'video',
  IMAGE = 'image',
}

export interface SceneData {
  url: string;
}

export interface Data360 extends SceneData {
  preview?: string;
  levels: DataLevel[];
  facesize: number;
  initialViewParameters: View360;
}

export interface DataLevel {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
}
