import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  username: string = "";
  password: string = "";
  message: string = "";

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  public register(): void {
    sessionStorage.removeItem("app.token");

    this
  }

  public login(): void {
      sessionStorage.removeItem("app.token");

      this.authService.login(this.username, this.password)
          .subscribe({
              next: (token) => {
                  sessionStorage.setItem("app.token", token);

                  const decodedToken = jwtDecode<JwtPayload>(token);
                  // @ts-ignore
                  sessionStorage.setItem("app.roles",  decodedToken.scope);

                  this.router.navigateByUrl("/books");
              },
              error: (error) => this.snackBar.open(`Login failed: ${error.status}`, "OK")
          });
  }
}
