import { Component, EventEmitter, Output } from '@angular/core';
import { IonItem, IonButton, IonInput } from '@ionic/angular/standalone';
import { Account } from '../../services/account';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';

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

  constructor(private fb: FormBuilder, private auth: Account, private toastCtrl: ToastController) { }

  onRegister() {
    // Clear previous error message
    this.message = '';

    if (this.form.invalid) return;

    const { username, password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.message = "Passwords do not match!";
      return;
    }

    this.auth.register(username!, password!, confirmPassword!).subscribe({
      next: () => {
        this.form.reset();
        this.message = '';
        this.showSuccessToast();
        setTimeout(() => this.switchToLogin.emit(), 3000);
      },
      error: (err) => (this.message = err.error?.error || "Registration failed! Username already exists."),
    });
  }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }

  async showSuccessToast() {
  const toast = await this.toastCtrl.create({
    message: "Account created successfully! Redirecting to login page...",
    duration: 3000,
    color: 'success',
    position: 'middle',
    });
  toast.present();
}

}