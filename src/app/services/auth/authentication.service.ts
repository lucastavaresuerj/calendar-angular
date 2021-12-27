import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../';

const AUTH_API = 'http://localhost:4000/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements CanActivate {
  isAuthenticated: boolean = false;

  // users: User[] = [{ name: 'Zé', password: '123456' }];

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  canActivate() {
    if (!environment.production && environment.noAuth) {
      return true;
    }
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.isAuthenticated;
  }

  reqAuth(type: 'login' | 'signin' | 'logout', user?: User): Observable<any> {
    return this.http.post(AUTH_API + type, user);
  }

  authHandler(name: string, token: string) {
    this.tokenStorage.saveToken(token);
    this.tokenStorage.saveUser({ name });

    this.isAuthenticated = true;
    this.router.navigate(['/']);
  }

  login(user: User) {
    return this.http.post(`${AUTH_API}/login`, user);
  }

  signin(user: User) {
    return this.http.post(`${AUTH_API}/logout`, user);
  }

  logout() {
    return this.http.post(`${AUTH_API}/logout`, null);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
