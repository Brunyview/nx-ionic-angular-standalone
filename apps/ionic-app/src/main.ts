import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { environment } from '@my-org/ionic-app/core/config-environment';
import { ConfigTranslocoModule } from '@my-org/ionic-app/core/config-transloco';
import { AppShellComponent } from '@my-org/ionic-app/core/feature-app-shell';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppShellComponent, {
  providers: [
    importProvidersFrom(
      ConfigTranslocoModule.forRoot(environment.production),
      IonicModule.forRoot(),
      RouterModule.forRoot([
        {
          path: '',
          loadChildren: () =>
            import('@my-org/ionic-app/tabs/feature-tabs').then((m) => m.routes),
        },
      ]),
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));
