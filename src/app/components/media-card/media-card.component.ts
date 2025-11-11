import { Component, OnInit } from '@angular/core';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonButton, 
  IonIcon, 
  AlertController, 
  IonSelect, 
  IonSelectOption,
  IonItem,
 } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { Media } from 'src/app/services/media';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductType } from 'src/app/interfaces/product-type.enum';
import { Favorites } from 'src/app/services/favorites';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { Account } from 'src/app/services/account';

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
  ScrollingModule,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonItem,
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
  isLoggedIn = false;

  constructor(private media: Media, private fav: Favorites, private auth: Account, private alertCtrl: AlertController) {
    addIcons({
    heart, heartOutline })
   }

  ngOnInit() {
    // load media cards
    this.products$ = this.media.getProductsInLahtiList();
    this.products$.subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
    });

    // watch login state
    this.auth.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
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
  async toggleFavorite(id: string) {
    if (!this.isLoggedIn) {
      const alert = await this.alertCtrl.create({
        header: 'Login required!',
        message: 'You must be logged in to manage favorites.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

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