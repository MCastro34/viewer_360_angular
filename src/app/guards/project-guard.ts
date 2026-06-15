import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Projects } from '../services/projects';

export const projectConfigsGuard: CanActivateFn = async (route, state) => {
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
    return _router.createUrlTree(['/', lang]);
  }
  // Check if configRef exists
  const configOK = await _projectsService.configExists(project.configRef);
  if (!configOK) {
    const lang = route.paramMap.get('lang');
    return _router.createUrlTree(['/', lang]);
  }
  return true;
};
