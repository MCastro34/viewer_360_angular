import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project, ProjectConfigs } from '../../../../../models/project';

@Component({
  selector: 'app-default',
  imports: [RouterLink],
  templateUrl: './default.html',
  styleUrl: './default.css',
})
export class Default {
  project = input<Project>({} as Project);
  configs = input<ProjectConfigs>({} as ProjectConfigs);

  startVisitLabel = 'Visita Interactiva';
  guidedVisitLabel = 'Visita Guiada';
  watchHereLabel = 'Em caso de dificuldades técnicas, veja aqui o vídeo';

  constructor() {}
}
