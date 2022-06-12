import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '@my-org/shared/ui-explore-container';

@Component({
  standalone: true,
  selector: 'my-org-tab2',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title> Tab 3 </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <my-org-explore-container name="Tab 3 page"></my-org-explore-container>
    </ion-content> `,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
})
export class Tab3Page {}
