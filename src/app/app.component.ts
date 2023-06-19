import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, NgModule } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'library-frontend';


  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches),
          shareReplay()
      );

  logout() {
      this.authService.logout();

      this.router.navigateByUrl("/");
  }

}
