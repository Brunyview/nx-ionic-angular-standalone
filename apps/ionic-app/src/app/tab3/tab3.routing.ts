import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./tab3.page').then((m) => m.Tab3Page),
  },
];
