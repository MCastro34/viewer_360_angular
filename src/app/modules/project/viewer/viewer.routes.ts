import { Routes } from '@angular/router';
import { sceneGuard } from '../../../guards/scene-guard';
import { sceneResolver } from '../../../resolvers/scene-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./viewer').then((m) => m.Viewer),
    children: [
      {
        path: ':scene',
        loadComponent: () => import('./hotspots/hotspots').then((m) => m.Hotspots),
        resolve: {
          sceneRef: sceneResolver,
        },
      },
    ],
    canActivate: [],
  },
];
