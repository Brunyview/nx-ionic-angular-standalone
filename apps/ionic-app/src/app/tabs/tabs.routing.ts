import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.routing').then((m) => m.routes),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.routing').then((m) => m.routes),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.routing').then((m) => m.routes),
      },

    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
