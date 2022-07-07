import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '@my-org/shared/ui-explore-container';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

const loader = ['en'].reduce((acc: any, lang: string) => {
  acc[lang] = () => import(`../../assets/i18n/${lang}.json`);
  return acc;
}, {});

@Component({
  standalone: true,
  selector: 'my-org-tab4',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>{{ 'tab4.hello' | transloco }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ 'tab4.hello' | transloco }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <my-org-explore-container
        name="{{ 'tab4.hello' | transloco }} page"
      ></my-org-explore-container>
    </ion-content>
  `,
  imports: [
    IonicModule,
    CommonModule,
    TranslocoModule,
    FormsModule,
    ExploreContainerComponent,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'tab4',
        loader,
      },
    },
  ],
})
export class Tab4Page {}
