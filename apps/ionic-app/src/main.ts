import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { environment } from '@my-org/ionic-app/core/config-environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot(),
      RouterModule.forRoot([
        {
          path: '',
          loadChildren: () =>
            import('./app/tabs/tabs.routing').then((m) => m.routes),
        },
      ]),
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));
