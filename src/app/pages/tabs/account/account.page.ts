import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { IonContent } from '@ionic/angular/standalone';
import { Account } from 'src/app/services/account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [ProfileComponent, RegisterComponent, LoginComponent, IonContent, CommonModule]
})
export class AccountPage implements OnInit {

  view: 'login' | 'register' | 'profile' = 'login';

  constructor(private auth: Account) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.view = 'profile';
    }
  }

  setView(view: 'login' | 'register' | 'profile') {
    this.view = view;
  }

  onLogout() {
    this.auth.logout();
    this.view = 'login';
  }

}