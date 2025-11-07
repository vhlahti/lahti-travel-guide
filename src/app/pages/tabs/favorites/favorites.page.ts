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
  // Automatically update when favorites change
    this.fav
      .getFavorites$()
      .pipe(
        switchMap((ids) => {
          // If no favorites yet, return empty array
          if (!ids?.length) return [ [] ];

          // Filter products matching favorite IDs
          return this.media.getProductsInLahtiList().pipe(
            map((products) => products.filter((p) => ids.includes(p.id)))
          );
        })
      )
      .subscribe({
        next: (matched) => (this.favoriteProducts = matched),
        error: (err) => console.error('Error loading favorite products:', err),
      });

    // Initial load from backend
    this.fav.loadFavorites();
  }

}