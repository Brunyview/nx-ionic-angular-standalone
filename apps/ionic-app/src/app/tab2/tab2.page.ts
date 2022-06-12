import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  standalone: true,

  selector: 'my-org-tab2',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title> Tab 2 </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>xs
          
        </ion-toolbar>
      </ion-header>
      <!-- <app-explore-container name="Tab 2 page"></app-explore-container> -->
    </ion-content> `,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
})
export class Tab2Page {
  constructor() {}
}
