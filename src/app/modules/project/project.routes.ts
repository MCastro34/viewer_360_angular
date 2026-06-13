import { Routes } from '@angular/router';

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
  },
];
