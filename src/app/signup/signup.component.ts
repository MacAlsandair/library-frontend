import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { UserRegistrationDTO } from '../auth/user-registration-dto';
import { catchError, switchMap, throwError } from 'rxjs';

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
  
    const userRegistrationDTO: UserRegistrationDTO = {
      username: this.username,
      password: this.password
    };
  
    this.authService.register(userRegistrationDTO).pipe(
      switchMap(() => this.authService.login(userRegistrationDTO.username, userRegistrationDTO.password)),
      catchError(error => {
        // Here we warn the user with an error message
        window.alert('Registration failed: ' + error.message);
        // We return the error back to terminate the process
        return throwError(error);
      })
    ).subscribe();
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
