import { Routes } from '@angular/router';
import { languageGuard } from './guards/language-guard';
import { projectResolver } from './resolvers/project-resolver';
import { inject } from '@angular/core';
import { Webtitle } from './services/webtitle';

export const routes: Routes = [
  // admin routes
  {
    path: '3d-admin',
    children: [],
    canActivate: [],
  },
  // language-specific routes
  {
    path: ':lang',
    children: [
      // route for the project viewer and landing page
      {
        path: ':project',
        loadChildren: () => import('./modules/project/project.routes').then((m) => m.routes),
        resolve: {
          project: projectResolver,
        },
      },
      // route for the projects list
      {
        path: '',
        loadComponent: () =>
          import('./modules/projects-list/projects-list').then((m) => m.ProjectsList),
      },
    ],
    canActivate: [languageGuard],
    title: () => {
      const title = inject(Webtitle);
      return title.toString('Projects');
    },
  },
  // redirect to the browser language or default language
  {
    path: '',
    children: [],
    canActivate: [languageGuard],
  },
];
