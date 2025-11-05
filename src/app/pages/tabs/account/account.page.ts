import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [ProfileComponent, RegisterComponent, LoginComponent, IonContent]
})
export class AccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
