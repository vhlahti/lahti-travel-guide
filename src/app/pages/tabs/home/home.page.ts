import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { MediaCardComponent } from 'src/app/components/media-card/media-card.component';
import { Media, Product } from 'src/app/services/media';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonTitle,
    MediaCardComponent
  ]
})
export class HomePage implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private media: Media) { }

  ngOnInit() {
    this.products$ = this.media.getProductsInLahtiList();
  }

}
