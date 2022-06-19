import { Component } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ProductService } from '@my-org/ionic-app/shared/product/data-access-product';
import { ProductStore } from '@my-org/ionic-app/shared/product/store-product';

@Component({
  selector: 'my-org-root',
  standalone: true,
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  // Import modules and providers from the feature-app module
  imports: [IonicModule, RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class AppShellComponent {}
