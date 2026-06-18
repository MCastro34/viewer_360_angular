import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Projects } from '../services/projects';

export const sceneGuard: CanActivateFn = async (route, state) => {
  const _router = inject(Router);
  const _projects = inject(Projects);
  const projectID = route.paramMap.get('project');
  if (!projectID) {
    throw new Error('Project ID not found in route parameters');
  }
  // Retrieve the project data from the service
  const project = await _projects.find(projectID);
  if (!project) {
    const lang = route.paramMap.get('lang');
    return _router.createUrlTree(['/', lang]);
  }
  // Fetch the project config
  const configRes = await fetch(project.configRef);
  if (!configRes.ok) {
    const lang = route.paramMap.get('lang');
    return _router.createUrlTree(['/', lang]);
  }
  const config = await configRes.json();
  if (!config) {
    const lang = route.paramMap.get('lang');
    return _router.createUrlTree(['/', lang]);
  }
  // Check if scene data exists
  const sceneID = route.paramMap.get('scene');
  const sceneRes = await fetch(`${config.sceneRef}/${sceneID}`, {
    method: 'HEAD',
    cache: 'no-store',
  });
  if (!config.sceneRef) {
    const lang = route.paramMap.get('lang');
    console.error("Scene ref is not defined in project's configs.");
    return _router.createUrlTree(['/', lang, projectID]);
  }
  // if scene ref does not exist, try for a json file
  if (!sceneRes.ok) {
    const sceneJsonRes = await fetch(`${config.sceneRef}/${sceneID}.json`, {
      method: 'HEAD',
      cache: 'no-store',
    });
    if (!sceneJsonRes.ok) {
      const lang = route.paramMap.get('lang');
      console.error(
        `There is no data available for the scene: ${sceneID}.\nCheck if '${config.sceneRef}' has either an endpoint for '${sceneID}' or it contains a '${sceneID}.json' file.`,
      );
      return _router.createUrlTree(['/', lang, projectID]);
    }
  }
  return true;
};
