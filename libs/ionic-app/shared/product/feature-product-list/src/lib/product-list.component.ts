import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QueryResultStore } from '@my-org/ionic-app/shared/product/store-query-result';
import { ProductTileComponent } from '@my-org/ionic-app/shared/product/ui-product-tile';
import { Product } from '@my-org/ionic-app/shared/product/util-interfaces';

@Component({
  selector: 'my-org-product-list',
  standalone: true,
  imports: [IonicModule, CommonModule, ScrollingModule, ProductTileComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="{{ 'back' }}"></ion-back-button>
        </ion-buttons>
        <!-- TODO: TransLoco translations per component -->
        <ion-title>
          {{ 'Products' }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content [fullscreen]="true" [scrollY]="false">
      <cdk-virtual-scroll-viewport
        class="ion-content-scroll-host"
        itemSize="375"
        minBufferPx="1900"
        maxBufferPx="8900"
      >
        <div style="max-width: 390px; width: 100%;" class="ion-padding">
          <my-org-product-tile
            *cdkVirtualFor="let item of products$ | async"
            [product]="item"
            (productClicked)="onProductClicked(item.id)"

          >
          </my-org-product-tile>
        </div>
        <ion-infinite-scroll (ionInfinite)="pageItems($event)">
          <ion-infinite-scroll-content>
            <div style="spin">
              <ion-spinner class="ion-text-center"></ion-spinner>
            </div>
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </cdk-virtual-scroll-viewport>
    </ion-content>
  `,
  styles: [
    `
      cdk-virtual-scroll-viewport {
        height: 100%;
        width: 365px;
        max-width: 365px;
      }
    `,
    `
      .spin {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      .center {
        padding: 100px 0;
        text-align: center;
      }
    `,
  ],
})
export class ProductListComponent {
  products$ = this.store.items$;
  loading$ = this.store.loading$;

  constructor(
    private readonly store: QueryResultStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  onClickProduct(id: string) {
    this.store.updateCurrentId(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  // TODO: use new Ionic type for this
  pageItems(event: any) {
    this.store.page();
    event.target.complete();
  }

  onProductClicked(id: string) {
    this.store.updateCurrentId(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  trackByFn(index: number, product: Product) {
    return product;
  }

  itemHeightFn(item: any, index: number) {
    return (3 / 4) * window.innerWidth + 165; // 80 being height of content under image
    // TODO: see if this can be calculated
  }
}
