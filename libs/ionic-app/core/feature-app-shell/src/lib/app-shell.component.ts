import { Component, EnvironmentInjector } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@Component({
  selector: 'my-org-root',
  standalone: true,
  template: `
    <ion-app>
      <ion-router-outlet
        [environmentInjector]="environmentInjector"
      ></ion-router-outlet>
    </ion-app>
  `,
  imports: [IonicModule, RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class AppShellComponent {
  constructor(public environmentInjector: EnvironmentInjector) {}
}
