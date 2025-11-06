import { Component, EventEmitter, Output } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Account } from 'src/app/services/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
   imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
],
  standalone: true
})
export class ProfileComponent {

  @Output() logout = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  username = ''; // Decode this from the JWT

  constructor(private auth: Account) {}

 onLogout() {
    this.auth.logout();
    this.logout.emit();
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }
  
}