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
  private LOCAL_API_URL = 'http://localhost:3000/api'; // For /api use proxy config

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

    return this.http.post<GetProductsResponse>(this.LOCAL_API_URL, { query });
  }

  // return just the product array
  getProductsInLahtiList() {
    return this.getProductsInLahti().pipe(map(res => res.data.product));
  }

}
