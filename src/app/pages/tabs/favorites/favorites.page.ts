import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Favorites } from 'src/app/services/favorites';
import { Media } from 'src/app/services/media';
import { Product } from 'src/app/interfaces/product.interface';
import { switchMap, map } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class FavoritesPage implements OnInit {
  favoriteProducts: Product[] = [];

  constructor(private fav: Favorites, private media: Media) { }

  ngOnInit() {
    // Fetch favorite IDs
    this.fav.getFavorites().pipe(
      switchMap((res: any) => {
        const ids = res?.favorites ?? res;  // backend returns { favorites: [] }
        console.log('Loaded favorites 2:', ids);

        // If no favorites, return an empty array
        if (!ids?.length) return [ [] ];

        // Load all products from your media service
        return this.media.getProductsInLahtiList().pipe(
          map(products => {
            console.log('Sample product:', products[0]); // inspect this in console
            const matched = products.filter(p => ids.includes(p.id)); // adjust id field if needed
            console.log('Matched favorites:', matched);
            return matched;
          })
        );
      })
    ).subscribe({
      next: (matchedProducts) => {
        this.favoriteProducts = matchedProducts;
        console.log('Favorite products:', matchedProducts);
      },
      error: (err) => console.error('Error fetching favorites:', err)
    });
  }
}