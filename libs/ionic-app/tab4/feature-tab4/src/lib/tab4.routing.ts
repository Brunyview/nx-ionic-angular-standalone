import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./tab4.page').then((m) => m.Tab4Page),
  },
];
