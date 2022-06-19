import { Injectable } from '@angular/core';
import {
  Product
} from '@my-org/ionic-app/shared/product/util-interfaces';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';

interface ProductState {
  items: Product[];
}

const initialProductState: ProductState = {
  items: [],
};

@Injectable()
export class ProductStore extends ComponentStore<ProductState> {
  readonly items$ = this.select((state: ProductState) => state.items);

  // add items to the list if they don't already exist
  readonly updateItems = this.updater(
    (state: ProductState, items: Product[]) => {
      const newItems = items.filter(
        (item) => !state.items.some((i) => i.id === item.id)
      );
      return {
        ...state,
        items: [...state.items, ...newItems],
      };
    }
  );

  constructor() {
    super(initialProductState);
  }
}
