import { Component } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  standalone: true,
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {
	active = 1;
}
