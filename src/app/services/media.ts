import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProductInformation {
  description?: string;
  language?: string;
  name?: string;
}

export interface Product {
  id: string;
  productInformations: ProductInformation[];
}

export interface GetProductsResponse {
  data: {
    product: Product[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class Media {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/api'; // use '/api' if you have an Angular proxy

    // get all products in Lahti (municipality code 398)

    getProductsInLahti(): Observable<GetProductsResponse> {
    const query = `query ProductsInLahti {
      product(where: {postalAddresses: {postalArea: { cityCode: {_eq: "398"}}}}) {
        id
        productInformations {
          description
          language
          name
        }
      }
    }`;

    return this.http.post<GetProductsResponse>(this.API_URL, { query });
  }

  // return just the product array
  getProductsInLahtiList() {
    return this.getProductsInLahti().pipe(map(res => res.data.product));
  }

}
