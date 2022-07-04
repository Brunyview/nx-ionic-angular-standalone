import { Route } from '@angular/router';
import { TabsPage } from '@my-org/ionic-app/core/feature-tabs';
import { ProductService } from '@my-org/ionic-app/shared/product/data-access-product';
import { ProductStore } from '@my-org/ionic-app/shared/product/store-product';

export const routes: Route[] = [
  {
    path: '',
    component: TabsPage,
    loadChildren: () =>
      import('@my-org/ionic-app-tabs-feature-tabs').then((m) => m.routes),
  },
];
