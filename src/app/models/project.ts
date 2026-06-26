import { Media } from './media';

export interface Project {
  id: string;
  title: string;
  description: string;
  timeframe: ProjectTimeFrame;
  url: string;
  background: Media;
  partners: Media[];
  configRef: string;
}

export interface ProjectTimeFrame {
  start: string;
  end?: string;
}

export interface ProjectConfigs {
  logo: LogoSettings;
  background: Media;
  template: ProjectTemplate;
  sceneRef: string;
  entry: string;
  guided: ProjectGuided;
  analytics: ProjectAnalytics;
  settings: ProjectSettings;
}

export interface LogoSettings {
  src: string;
  mini?: string;
}

export interface ProjectGuided {
  enabled: boolean;
}

export interface ProjectAnalytics {
  enabled: boolean;
  id: string;
}

export interface ProjectSettings {}

export enum ProjectTemplate {
  DEFAULT = 'default',
  EXTENDED = 'extended',
}
