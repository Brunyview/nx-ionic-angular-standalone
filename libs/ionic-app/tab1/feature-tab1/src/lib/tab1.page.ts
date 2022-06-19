import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QueryResultStore } from '@my-org/ionic-app/shared/product/store-query-result';
import { ExploreContainerComponent } from '@my-org/shared/ui-explore-container';

@Component({
  standalone: true,
  selector: 'my-org-tab1',
  template: `<ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title> Tab 1 </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item (click)="search1()" detail="true">
          <ion-label>Search Tasmania</ion-label>
        </ion-item>
        <ion-item (click)="search2()" detail="true">
        <ion-label>Search Western Australia</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>`,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
})
export class Tab1Page {
  constructor(private readonly store: QueryResultStore, private readonly router: Router) { }

  search1() {
    this.store.updateQuery({ states: 'TAS' });
    this.router.navigate(['tab1', 'products']);
  }

  search2() {
    this.store.updateQuery({ states: 'WA' });
    this.router.navigate(['tab1', 'products']);
  }

}
