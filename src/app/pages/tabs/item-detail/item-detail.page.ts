import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSpinner } from '@ionic/angular/standalone';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { Media } from 'src/app/services/media';
import { ActivatedRoute } from '@angular/router';
import { TagUnderscorePipe } from './tag-underscore.pipe';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonSpinner,
    TagUnderscorePipe
  ]
})
export class ItemDetailPage implements OnInit {
  product$!: Observable<Product | undefined>;

  constructor(private media: Media, private route: ActivatedRoute) { }

  ngOnInit() {

    // Resolve blocked aria-hidden error
    const activeElement = document.activeElement as HTMLElement;
    activeElement?.blur();
    
    // Compare id
    const id = this.route.snapshot.paramMap.get('id');
    this.product$ = this.media.getProductsInLahtiList().pipe(
      map(products => products.find(p => p.id === id))
    );

  }

}
