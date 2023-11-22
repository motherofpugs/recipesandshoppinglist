import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  constructor(private authService: AuthService) {}
  public login() {
    this.authService.login(this.loginForm.value).subscribe();
  }

  public registration() {
    if (this.loginForm.valid) {
      this.authService.registration(this.loginForm.value).subscribe();
    }
  }
  public logout() {}
  public loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
