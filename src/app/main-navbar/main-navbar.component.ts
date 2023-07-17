import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  imports: [CommonModule, FormsModule],
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

    this.router.navigateByUrl("/registration");
  }

  navigateToUserCabinet() {
    this.router.navigateByUrl("/user-cabinet");
  }

  home() {
    this.router.navigateByUrl("/");
  }

  // public search(searchText: string): void {
  //   if (searchText) {
  //     this.searchService.announceSearch(searchText);
  //   }
  // }
}
