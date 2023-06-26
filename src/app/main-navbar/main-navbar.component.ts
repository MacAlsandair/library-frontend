import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {
  active = 1;

  constructor(public authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();

    this.router.navigateByUrl("/login");
  }

  login() {

    this.router.navigateByUrl("/login");
  }

  signup() {

    this.router.navigateByUrl("/signup");
  }
}
