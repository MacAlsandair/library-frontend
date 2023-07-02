import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserRegistrationDTO } from './user-registration-dto';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private http: HttpClient) {
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem("app.token") != null;
    }

    login(username: string, password: string): Observable<string> {
        const httpOptions = {
            headers: {
                Authorization: 'Basic ' + window.btoa(username + ':' + password)
            },
            responseType: 'text' as 'text',
        };
        return this.http.post("/api/auth", null, httpOptions);
    }

    register(userRegistrationDTO: UserRegistrationDTO): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            responseType: 'text' as 'json'
          };
          
        console.log("I've sent something", userRegistrationDTO);
        return this.http.post<string>("/api/auth/register", userRegistrationDTO, httpOptions);
    }

    logout() {
        sessionStorage.removeItem("app.token");
        sessionStorage.removeItem("app.roles");
    }

    isUserInRole(roleFromRoute: string) {
        const roles = sessionStorage.getItem("app.roles");

        if (roles!.includes(",")) {
            if (roles === roleFromRoute) {
                return true;
            }
        } else {
            const roleArray = roles!.split(",");
            for (let role of roleArray) {
                if (role === roleFromRoute) {
                    return true;
                }
            }
        }
        return false;
    }

    postRegistrationLogin(username: string, password: string) {
        return this.login(username, password);
    }
}
