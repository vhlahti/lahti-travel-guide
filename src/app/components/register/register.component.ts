import { Component, OnInit } from '@angular/core';
import { IonItem, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
   imports: [
    IonItem,
    IonButton,
    IonInput,
],
  standalone: true
})
export class RegisterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
