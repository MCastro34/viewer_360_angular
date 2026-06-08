import { Routes } from '@angular/router';

export const routes: Routes = [
  // /:project is the project landing page
  // / is the projects list, if there is only one project: it is the same as /:project
  {
    path: '',
    loadComponent: () =>
      import('./modules/projects-list/projects-list').then((m) => m.ProjectsList),
  },
];
