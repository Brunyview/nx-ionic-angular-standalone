import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./tab1.page').then((m) => m.Tab1Page),
    loadChildren: () =>
      import('@my-org/ionic-app/shared/product/feature-product-list').then(
        (m) => m.routes
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('@my-org/ionic-app/shared/product/feature-product-list').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import('@my-org/ionic-app/shared/product/feature-product-details').then(
        (m) => m.routes
      ),
  },
];
