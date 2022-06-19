import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QueryResultStore } from '@my-org/ionic-app/shared/product/store-query-result';
import { ExploreContainerComponent } from '@my-org/shared/ui-explore-container';

@Component({
  selector: 'my-org-product-details',
  standalone: true,
  template: `
    <ion-header *ngIf="product$ | async as product">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="{{ 'back' }}"></ion-back-button>
        </ion-buttons>
        <ion-title name="Product Details">
          <ion-label
            color="secondary"
            class=" category one-line title-classifications ion-text-nowrap"
          >
            {{ product.name }}
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-label>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div *ngIf="product$ | async as product">
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ product.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ product.description }}</p>
            <ion-button (click)="onClickPrevious()"> Previous </ion-button>
            <ion-button (click)="onClickNext()"> Next </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponent],
})
export class ProductDetailsPage {
  product$ = this.store.currentItem$;

  constructor(private store: QueryResultStore) {}

  onClickPrevious() {
    this.store.updateCurrentIdToPrevious();
  }

  onClickNext() {
    this.store.updateCurrentIdToNext();
  }
}
