import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {

  @Output() logout = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  username: string | null = null;

  constructor(private auth: Account) {}

  ngOnInit() {
    // Fetch the user's profile using the JWT in localStorage
    this.auth.fetchProfile().subscribe({
      next: (user) => {
        this.username = user.username;
      },
      error: () => {
        this.username = null;
      },
    });
  }

 onLogout() {
    this.auth.logout();
    this.username = null;
    this.logout.emit();
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }
  
}