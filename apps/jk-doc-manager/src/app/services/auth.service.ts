import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  sessionID = '';
  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http
      .post('http://localhost:3000/api/user/login', body)
      .pipe(tap((response: any) => (this.sessionID = response?.data)));
  }

  check(body: any) {
    return this.http.post('http://localhost:3000/api/user/check', body);
  }
}
