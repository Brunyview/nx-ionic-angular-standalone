import { Route } from '@angular/router';
import { TabsPage } from '@my-org/ionic-app/core/feature-tabs';

export const routes: Route[] = [
  {
    path: '',
    component: TabsPage,
    loadChildren: () =>
      import('@my-org/ionic-app/core/feature-tabs').then((m) => m.routes),
  },
];
