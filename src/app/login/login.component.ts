// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  displayName: string = '';
  photoURL: string = '';
  isLoginMode: boolean = true;

  constructor(private authService: AuthService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.authService.login(this.email, this.password);
    } else {
      this.authService.signup(this.email, this.password, this.displayName, this.photoURL);
    }
  }

  logout() {
    this.authService.logout();
  }
}
