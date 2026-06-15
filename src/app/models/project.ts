interface Project {
  id: string;
  title: string;
  description: string;
  timeframe: ProjectTimeFrame;
  url: string;
  background: Media;
  partners: Media[];
  configRef: string;
}

interface ProjectTimeFrame {
  start: string;
  end?: string;
}

interface ProjectConfigs {
  logo: Media;
  background: Media;
  template: ProjectTemplate;
  sceneRef: string;
  entry: string;
  guided: ProjectGuided;
  analytics: ProjectAnalytics;
  settings: ProjectSettings;
}

interface ProjectGuided {
  enabled: boolean;
}

interface ProjectAnalytics {
  enabled: boolean;
  id: string;
}

interface ProjectSettings {}

enum ProjectTemplate {
  DEFAULT = 'default',
  EXTENDED = 'extended',
}
