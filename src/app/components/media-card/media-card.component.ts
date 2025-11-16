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
  IonSpinner,
  IonSearchbar,
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
import { heart, heartOutline, optionsOutline, arrowUpOutline } from 'ionicons/icons';
import { Account } from 'src/app/services/account';
import { ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { PreferredInfoPipe } from 'src/app/pipes/preferred-info.pipe';
import { getPreferredInfo } from 'src/app/helpers/preferred-info.helper';

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
  IonSpinner,
  IonSearchbar,
  PreferredInfoPipe,
  ],
  standalone: true
})
export class MediaCardComponent implements OnInit {
  @ViewChild('viewport') viewport!: CdkVirtualScrollViewport;

  products$!: Observable<Product[]>; // original product list

  allProducts: Product[] = [];        // store all products again
  filteredProducts: Product[] = [];   // store filtered list
  selectedCategory: ProductType | 'all' = 'all';
  searchTerm: string = '';            // search query

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

  selectedSort: string = 'alphabetical-asc';
  favoriteIds: string[] = [];
  isLoggedIn = false;
  loading = true;

  constructor(private media: Media, private fav: Favorites, private auth: Account, private alertCtrl: AlertController) {
    addIcons({
    heart, heartOutline, optionsOutline, arrowUpOutline })
   }

  ngOnInit() {
    // load media cards
    this.products$ = this.media.getProductsInLahtiList();
    this.products$.subscribe((products) => {
      this.allProducts = products;
      this.filteredProducts = products;
      this.loading = false; // loading complete, stop spinner
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

  // filtering logic by category and search term
  filterByCategory(category: ProductType | 'all') {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // search by product name
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.applyFilters();
  }

  /** Sort selection */
  sortProducts(sortBy: string) {
    this.selectedSort = sortBy;
    this.applyFilters();
  }

  // combined filter
  private applyFilters() {
    let results = [...this.allProducts];

    // Filter by category
    if (this.selectedCategory !== 'all') {
      results = results.filter(product => product.type === this.selectedCategory);
    }

    // Filter by search term (case-insensitive)
    if (this.searchTerm.trim()) {
      const query = this.searchTerm.toLowerCase();
      results = results.filter(product => {
      const info = getPreferredInfo(product.productInformations);
      return info?.name?.toLowerCase().includes(query);
      });
    }

    results = this.sortResults(results, this.selectedSort);
    this.filteredProducts = [...results];

    // scroll back to top
    if (this.viewport) {
      this.viewport.scrollToIndex(0);
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

  /** Sorting helper */
  private sortResults(products: Product[], sortBy: string): Product[] {
    switch (sortBy) {
      case 'alphabetical-asc':
        return [...products].sort((a, b) =>
          (getPreferredInfo(a.productInformations)?.name || '').localeCompare(getPreferredInfo(b.productInformations)?.name || '')
        );
      case 'alphabetical-desc':
        return [...products].sort((a, b) =>
          (getPreferredInfo(b.productInformations)?.name || '').localeCompare(getPreferredInfo(a.productInformations)?.name || '')
        );
      case 'oldest':
        return [...products].sort((a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      case 'newest':
        return [...products].sort((a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      default:
        return products;
    }
  }

}