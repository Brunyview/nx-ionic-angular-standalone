import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Product } from '@my-org/ionic-app/shared/product/util-interfaces';

@Component({
  standalone: true,
  selector: 'my-org-product-tile',
  template: `
    <ion-card color="light" (click)="clickProduct()">
      <ion-card-header>
        <ion-card-title>
          <h3>{{ product.name }}</h3>
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>{{ product.description }}</p>
      </ion-card-content>
    </ion-card>
    <br />
  `,
  styles: [

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule],
})
export class ProductTileComponent {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<string>();

  clickProduct() {
    this.productClicked.emit(this.product.id);
  }
}
