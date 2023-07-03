import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCabinetService {
  private API_URL = 'api/auth';

  constructor(private http: HttpClient) { }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.API_URL}/changePassword`, {
      oldPassword,
      newPassword
    }, { responseType: 'text' });
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete`, { responseType: 'text' });
  }
}
