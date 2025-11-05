import { Component, OnInit } from '@angular/core';
import { IonItem, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonItem,
    IonButton,
    IonInput,
],
  standalone: true
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
