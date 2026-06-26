import { ResolveFn, Router, UrlTree } from '@angular/router';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { Projects } from '../services/projects';
import { Project } from '../models/project';

export const projectResolver: ResolveFn<Project> = async (route, state) => {
  const _router = inject(Router);
  const _projectsService = inject(Projects);
  // Find the project in the route parameters
  const projectID = route.paramMap.get('project');
  if (!projectID) {
    throw new Error('Project ID not found in route parameters');
  }
  // Retrieve the project data from the service
  const project = await _projectsService.find(projectID);
  if (!project) {
    const lang = route.paramMap.get('lang');
    _router.navigate(['/', lang]);
    throw new Error(`Project with ID ${projectID} not found`);
  }
  return project;
};
