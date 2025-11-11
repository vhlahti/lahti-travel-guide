import { Component, EventEmitter, Output } from '@angular/core';
import { IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { Account } from '../../services/account';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    IonItem,
    IonButton,
    IonInput,
    CommonModule,
    ReactiveFormsModule,
],
  standalone: true
})
export class RegisterComponent {

  @Output() switchToLogin = new EventEmitter<void>();

  message = '';
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private auth: Account) { }

  onRegister() {
    if (this.form.invalid) return;

    const { username, password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.message = "Passwords do not match!";
      return;
    }

    this.auth.register(username!, password!, confirmPassword!).subscribe({
      next: () => {
        this.message = "Account created successfully!";
        setTimeout(() => this.switchToLogin.emit(), 3000);
      },
      error: (err) => (this.message = err.error?.error || "Registration failed! Username already exists."),
    });
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }

}