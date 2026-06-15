import { httpResource } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Projects } from '../../services/projects';

@Component({
  selector: 'app-projects-list',
  imports: [],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.css',
})
export class ProjectsList {
  _projectsService = inject(Projects);

  projects = this._projectsService.projectsResource;

  constructor() {}
}
