import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  standalone: true,
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {
	active = 1;

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();

    this.router.navigateByUrl("/");
}
}
