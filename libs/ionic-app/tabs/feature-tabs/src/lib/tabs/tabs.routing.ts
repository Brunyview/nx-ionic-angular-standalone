import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tab1',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('@my-org/ionic-app/tab1/feature-tab1').then((m) => m.routes),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('@my-org/ionic-app/tab2/feature-tab2').then((m) => m.routes),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('@my-org/ionic-app/tab3/feature-tab3').then((m) => m.routes),
      },

      {
        path: '',
        redirectTo: '/tab1',
        pathMatch: 'full',
      },
    ],
  },
];
