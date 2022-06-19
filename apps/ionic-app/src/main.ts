import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppShellComponent } from '@my-org/ionic-app-core-feature-app-shell';
import { environment } from '@my-org/ionic-app/core/config-environment';
import { ProductService } from '@my-org/ionic-app/shared/product/data-access-product';
import { ProductStore } from '@my-org/ionic-app/shared/product/store-product';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppShellComponent, {
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiInterceptor,
    //   multi: true,
    // },
    importProvidersFrom(
      IonicModule.forRoot(),
      RouterModule.forRoot([
        {
          path: '',
          providers: [ProductStore, ProductService],
          loadChildren: () =>
            import('@my-org/ionic-app/core/feature-tabs').then((m) => m.routes),
        },
      ]),
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));
