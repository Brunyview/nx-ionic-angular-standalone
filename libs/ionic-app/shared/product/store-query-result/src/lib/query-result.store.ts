import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@my-org/ionic-app/shared/product/data-access-product';
import { ProductStore } from '@my-org/ionic-app/shared/product/store-product';
import {
  Product,
  Query,
} from '@my-org/ionic-app/shared/product/util-interfaces';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  combineLatest,
  EMPTY,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

interface QueryResultState {
  ids: string[];
  currentId: string;
  query: Query | null;
  userLocation: string;
  language: string;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  filtering: boolean;
  error: string;
}

const InitialQueryResultState: QueryResultState = {
  ids: [],
  currentId: '',
  query: null,
  userLocation: '-43.1554,147.0739',
  language: 'ENGLISH',
  pageNumber: 1,
  pageSize: 5,
  loading: false,
  filtering: false,
  error: '',
};

@Injectable()
export class QueryResultStore extends ComponentStore<QueryResultState> {
  //#region selectors

  private readonly ids$ = this.select((state: QueryResultState) => state.ids);

  readonly query$ = this.select((state: QueryResultState) => state.query);
  readonly currentId$ = this.select(
    (state: QueryResultState) => state.currentId
  );
  readonly items$ = combineLatest([this.ids$, this.store.items$]).pipe(
    map(
      ([ids, items]) =>
        ids.map((id) => items.find((i) => i.id === id)) as Product[]
    )
  );
  readonly currentItem$ = combineLatest([this.currentId$, this.items$]).pipe(
    map(([id, items]) => items.find((i) => i.id === id) as Product)
  );

  readonly userLocation$ = this.select(
    (state: QueryResultState) => state.userLocation
  );
  readonly language$ = this.select((state: QueryResultState) => state.language);
  readonly pageNumber$ = this.select(
    (state: QueryResultState) => state.pageNumber
  );
  readonly pageSize$ = this.select((state: QueryResultState) => state.pageSize);
  readonly loading$ = this.select((state: QueryResultState) => state.loading);
  readonly filtering$ = this.select(
    (state: QueryResultState) => state.filtering
  );
  readonly error$ = this.select((state: QueryResultState) => state.error);
  //readonly queryResult$ = this.select((state: QueryResultState) => state);

  //#endregion

  //#region Updaters
  readonly updateIds = this.updater(
    (state: QueryResultState, ids: string[]) => {
      return {
        ...state,
        ids: state.pageNumber == 1 ? [...ids] : [...state.ids, ...ids],
      };
    }
  );
  readonly updateCurrentId = this.updater(
    (state: QueryResultState, id: string) => ({
      ...state,
      currentId: id,
    })
  );
  readonly updatePageNumber = this.updater(
    (state: QueryResultState, pageNumber: number) => ({
      ...state,
      pageNumber,
    })
  );
  // ?
  readonly incrementPageNumber = this.updater(
    (state: QueryResultState) => ({
      ...state,
      pageNumber: state.pageNumber + 1,
    })
  );
  // remove in place of patching state as it shouldn't trigger a load??
  readonly updateLoading = this.updater(
    (state: QueryResultState, loading: boolean) => ({
      ...state,
      loading,
    })
  );
  readonly updateFiltering = this.updater(
    (state: QueryResultState, filtering: boolean) => ({
      ...state,
      filtering,
    })
  );
  readonly updateQuery = this.updater(
    (state: QueryResultState, query: Query) => {
      // ? clear the items ids from the store before the new search
      this.updateIds([]);
      this.router.navigate([]);
      // ??
      return {
        ...state,
        query,
        pageNumber: 1,
        currentId: '',
      };
    }
  );
  readonly updateError = this.updater(
    (state: QueryResultState, error: string) => ({
      ...state,
      error,
    })
  );
  readonly updateCurrentIdToNext = this.updater((state: QueryResultState) => {
    const currentItemIndex = state.ids.findIndex(
      (id) => id === state.currentId
    );
    return {
      ...state,
      currentId:
        currentItemIndex + 1 < state.ids.length
          ? state.ids[currentItemIndex + 1]
          : state.ids[0],
    } as QueryResultState;
  });
  readonly updateCurrentIdToPrevious = this.updater(
    (state: QueryResultState) => {
      const currentItemIndex = state.ids.findIndex(
        (id) => id === state.currentId
      );
      return {
        ...state,
        currentId:
          currentItemIndex - 1 >= 0
            ? state.ids[currentItemIndex - 1]
            : state.ids[state.ids.length - 1],
      } as QueryResultState;
    }
  );
  //#endregion

  load = this.effect<Query>(() =>
    combineLatest([
      this.query$,
      of(''),
      of('ENGLISH'),
      this.pageSize$,
      this.pageNumber$,
    ]).pipe(
      tap(([query, , , pageNumber]) => {
        this.updateLoading(pageNumber === 1);
        this.updateFiltering(this.get().query !== query);
      }),
      switchMap(([query, language, userLocation, pageSize, pageNumber]) => {
        if (query) {
          return this.productService
            .getProducts(query, language, userLocation, pageSize, pageNumber)
            .pipe(
              tap({
                next: (result) => {
                  this.store.updateItems(result.products);
                  this.updateIds(result.products.map((p) => p.id));
                  this.updateLoading(false);
                  this.updateFiltering(false);
                },
              }),
              catchError((error) => {
                this.updateError(error);
                this.updateLoading(false);
                return EMPTY;
              })
            );
        } else {
          this.updateLoading(false);
          return EMPTY;
        }
      })
    )
  );

  page() {
    this.incrementPageNumber();
  }

  constructor(
    private readonly productService: ProductService,
    private readonly store: ProductStore,
    private readonly router: Router
  ) {
    super(InitialQueryResultState);
  }
}
