import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { environment } from '@my-org/ionic-app/core/config-environment';
import {
  Query,
  SearchResult,
} from '@my-org/ionic-app/shared/product/util-interfaces';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(
    query: Query,
    userLocation: string,
    language: string,
    pageSize: number,
    pageNumber: number
  ) {
    return this.http.get<SearchResult>(`${environment.apiUrl}/product/search`, {
      //build up the pars first so we don't include ones with empty values
      // or have an interceptor clean up th request for us?

      params: {
        st: query.states?? '',
       // latlong: userLocation,
        mv: language,
        size: pageSize.toString(),
        pge: pageNumber.toString(),
      },
      headers: {
        'api-key': environment.apiKey,
        'bundle-Id': environment.bundleId,
      },
    });
  }
}
