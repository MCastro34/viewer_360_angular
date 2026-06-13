import { ResolveFn } from '@angular/router';

export const projectResolver: ResolveFn<boolean> = (route, state) => {
  // Find the project in the route parameters
  const project = route.paramMap.get('project');
  console.log(project);
  return true;
};
