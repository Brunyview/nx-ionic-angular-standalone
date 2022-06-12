import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppShellComponent } from '@my-org/ionic-app-core-feature-app-shell';
import { environment } from '@my-org/ionic-app/core/config-environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppShellComponent, {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot(),
      RouterModule.forRoot([
        {
          path: '',
          loadChildren: () =>
            import('@my-org/ionic-app/core/feature-tabs').then((m) => m.routes),
        },
      ]),
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));
