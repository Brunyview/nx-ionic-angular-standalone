import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    // translations
    title: 'Products',
    loadComponent: () =>
      import('../lib/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
];
