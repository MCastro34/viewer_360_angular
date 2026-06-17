import { Routes } from '@angular/router';
import { projectConfigsGuard } from '../../guards/project-guard';
import { inject } from '@angular/core';
import { Webtitle } from '../../services/webtitle';

export const routes: Routes = [
  {
    path: '',
    children: [
      // route for the project viewer with specified scene
      {
        path: 'viewer/:scene',
        loadComponent: () => import('./viewer/viewer').then((m) => m.Viewer),
      },
      // route for the project landing page
      {
        path: '',
        loadComponent: () => import('./landing-page/landing-page').then((m) => m.LandingPage),
      },
    ],
    canActivate: [projectConfigsGuard],
    title: (route) => {
      const title = inject(Webtitle);
      return title.toString(route.data.project.title);
    },
  },
];
