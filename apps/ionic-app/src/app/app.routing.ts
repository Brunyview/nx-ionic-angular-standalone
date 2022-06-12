import { Route } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Route[] = [
  {
    path: '',
    component: TabsPage,
    loadChildren: () => import('./tabs/tabs.routing').then((m) => m.routes),
  },
];
