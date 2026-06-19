import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Projects } from '../services/projects';

export const sceneResolver: ResolveFn<string | undefined> = async (route, state) => {
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
    _router.navigate(['/', lang]);
    throw new Error('Project not found.');
  }
  // Fetch the project config
  const configRes = await fetch(project.configRef, {
    headers: {
      Accept: 'application/json',
    },
  });
  if (!configRes.ok) {
    const lang = route.paramMap.get('lang');
    _router.navigate(['/', lang]);
    throw new Error('Config does not exist.');
  }
  const config = await configRes.json();
  if (!config) {
    const lang = route.paramMap.get('lang');
    _router.navigate(['/', lang]);
    throw new Error('Project ID not found in route parameters');
  }
  // Check if scene data exists
  const sceneID = route.paramMap.get('scene');
  if (!config.sceneRef) {
    const lang = route.paramMap.get('lang');
    _router.navigate(['/', lang, projectID]);
    throw new Error("Scene ref is not defined in project's configs.");
  }
  const sceneRes = await fetch(`${config.sceneRef}/${sceneID}`, {
    method: 'HEAD',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });
  // if scene ref does not exist, try for a json file
  if (!sceneRes.ok) {
    const sceneJsonRes = await fetch(`${config.sceneRef}/${sceneID}.json`, {
      method: 'HEAD',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!sceneJsonRes.ok) {
      const lang = route.paramMap.get('lang');
      _router.navigate(['/', lang, projectID]);
      throw new Error(
        `There is no data available for the scene: ${sceneID}.\nCheck if '${config.sceneRef}' has either an endpoint for '${sceneID}' or it contains a '${sceneID}.json' file.`,
      );
    }
    return `${config.sceneRef}/${sceneID}.json`;
  }
  return `${config.sceneRef}/${sceneID}`;
};
