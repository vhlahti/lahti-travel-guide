import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { Media } from 'src/app/services/media';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductType } from 'src/app/interfaces/product-type.enum';
import { Favorites } from 'src/app/services/favorites';

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

  favoriteIds: string[] = [];

  constructor(private media: Media, private fav: Favorites) { }

  ngOnInit() {
    // load media cards
    this.products$ = this.media.getProductsInLahtiList();
    this.products$.subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
    });

    // subscribe once to the BehaviorSubject for real-time favorites
    this.fav.getFavorites$().subscribe((ids) => (this.favoriteIds = ids));

    // load initial favorites from backend
    this.fav.loadFavorites();
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

  // favorites toggle
  toggleFavorite(id: string) {
  if (this.favoriteIds.includes(id)) {
    this.fav.removeFavorite(id).subscribe();
  } else {
    this.fav.addFavorite(id).subscribe();
  }
  }

  // helper for the template
  isFavorite(productId: string): boolean {
    return this.favoriteIds.includes(productId);
  }

}