interface Scene {
  id: string;
  name: string;
  description: string;
  type: string;
  data: SceneData;
}

interface SceneData {
  url: string;
}

interface Data360 extends SceneData {
  levels: DataLevel[];
  facesize: number;
  initialViewParameters: View360;
}

interface DataLevel {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
}
