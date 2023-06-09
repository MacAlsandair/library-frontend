import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router) {
    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLoggedIn() && this.authService.isUserInRole(next.routeConfig?.data?.['role'])) {
          return true;
        } else {
          this.router.navigateByUrl("/login");
          return false;
        }
      }
}
