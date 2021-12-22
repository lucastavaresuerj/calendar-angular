import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const AUTH_API = 'http://localhost:4000/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements CanActivate {
  auth: boolean = false;

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
    if (!this.auth) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.auth;
  }

  reqAuth(type: 'login' | 'signin' | 'logout', user?: User): Observable<any> {
    return this.http.post(AUTH_API + type, user, httpOptions);
  }

  authHandler(name: string, callback?: Function) {
    return {
      next: (data: any) => {
        if (data.extensions) {
          this.auth = false;
          return;
        }
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser({ name });

        this.auth = true;
        this.router.navigate(['/']);

        if (callback) callback(data);
      },
      error: (err: Error) => {
        console.log(err);
        if (callback) callback(err);
        this.auth = false;
      },
    };
  }

  login(user: User, callback: Function) {
    this.reqAuth('login', user).subscribe(
      this.authHandler(user.name, callback)
    );
  }

  logout() {
    this.reqAuth('logout').subscribe({
      next: (data) => {
        this.auth = false;
        this.router.navigate(['/login']);
      },
      error: (err) => console.log(err),
    });
  }

  signin(user: User, callback: Function) {
    this.reqAuth('signin', user).subscribe(
      this.authHandler(user.name, callback)
    );
  }

  isAuth() {
    return this.auth;
  }
}
