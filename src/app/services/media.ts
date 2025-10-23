import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetProductsResponse } from '../interfaces/product.interface';

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
        type
        duration
        durationType
        company {
          businessName
        }
        postalAddresses {
          location
          postalCode
          streetName
          city
        }
        productAvailableMonths {
          month
        }
        productInformations {
          description
          language
          name
          url
          webshopUrl
        }
        productImages {
          copyright
          filename
          altText
          largeUrl
          originalUrl
          thumbnailUrl
          coverPhoto
          orientation
          originalWidth
          originalHeight
        }
        productPricings {
          toPrice
          fromPrice
          pricingUnit
          pricingType
        }
        productTags {
          tag
        }
        productTargetGroups {
          targetGroupId
        }
        productVideos {
          title
          url
        }
        accessible
        contactDetails {
          email
          phone
        }
        productAvailabilities {
          endDate
          startDate
        }
        productCapacities {
          max
          min
        }
        productCertificates {
          certificateDetails {
            description
            name
            logoUrl
            websiteUrl
          }
          certificate
        }
        updatedAt
        productAvailabilityLanguages {
          language
        }
        socialMedia {
          socialMediaLinks {
            linkType
            verifiedLink {
              url
            }
          }
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
