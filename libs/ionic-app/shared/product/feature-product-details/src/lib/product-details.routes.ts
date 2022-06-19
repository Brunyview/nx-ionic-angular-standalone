import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../lib/product-details.page').then((m) => m.ProductDetailsPage),
  },
];
