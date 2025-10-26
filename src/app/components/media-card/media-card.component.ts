import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { Media } from 'src/app/services/media';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductType } from 'src/app/interfaces/product-type.enum';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  imports: [
  CommonModule,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  RouterModule,
  ScrollingModule
  ],
  standalone: true
})
export class MediaCardComponent implements OnInit {
  products$!: Observable<Product[]>; // original product list

  allProducts: Product[] = [];        // store all products again
  filteredProducts: Product[] = [];   // store filtered list
  selectedCategory: ProductType | 'all' = 'all';

  productCategories: ProductType[] = [
  ProductType.Accommodation,
  ProductType.Attraction,
  ProductType.Experience,
  ProductType.Event,
  ProductType.RentalService,
  ProductType.Restaurant,
  ProductType.Shop,
  ProductType.Transportation,
  ProductType.Venue
  ];

  constructor(private media: Media) { }

  ngOnInit() {
    this.products$ = this.media.getProductsInLahtiList();

    // subscribe to store products locally for filtering
    this.products$.subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products; // initially show all
    });
  }

  // filtering logic
  filterByCategory(category: ProductType | 'all') {
    this.selectedCategory = category;

    if (category === 'all') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(
        product => product.type === category
      );
    }
  }

  // hide underscores and capitalize words
  formatCategory(cat: string) {
  return cat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

}
