import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./tab1.page').then((m) => m.Tab1Page),
  },
];
