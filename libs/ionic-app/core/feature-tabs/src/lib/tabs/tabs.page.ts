import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'my-org-tab1',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>{{ 'tab1' }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2">
          <ion-icon name="pricetags-outline"></ion-icon>
          <ion-label>{{ 'tab2' }}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3">
          <ion-icon name="bookmarks-outline"></ion-icon>
          <ion-label>{{ 'tab3' }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TabsPage {}
