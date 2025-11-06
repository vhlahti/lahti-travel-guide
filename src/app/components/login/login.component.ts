import { Component, EventEmitter, Output } from '@angular/core';
import { IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { Account } from '../../services/account';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonItem,
    IonButton,
    IonInput,
    CommonModule,
    ReactiveFormsModule,
],
  standalone: true
})
export class LoginComponent {

  @Output() switchToRegister = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  errorMessage = '';

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private auth: Account) { }

  onLogin() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;

    this.auth.login(username!, password!).subscribe({
      next: () => this.loginSuccess.emit(),
      error: (err) => (this.errorMessage = err.error?.error || "Login failed! Please check your credentials."),
    });
  }

  onSwitchToRegister() {
    this.switchToRegister.emit();
  }
  
}