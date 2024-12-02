import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly domain = 'http://localhost:3000';
  isAuthenticated = signal(false);
  sessionID = '';
  router = inject(Router);

  constructor(private http: HttpClient) {
    effect(() => {
      if (!this.isAuthenticated()) {
        this.router.navigate(['/sign-in']);
      }
    });
  }

  login(body: any) {
    return this.http.post(this.domain + '/api/user/login', body).pipe(
      tap((response: any) => {
        this.sessionID = response?.data;
        if (this.sessionID) {
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  signUp(body: any) {
    return this.http.post(this.domain + '/api/user', body);
  }

  signOut() {
    return this.http.get(this.domain + '/api/user/logout').subscribe(() => {
      this.isAuthenticated.set(false);
    });
  }

  check(body: any) {
    return this.http.post(this.domain + '/api/user/check', body);
  }
}
