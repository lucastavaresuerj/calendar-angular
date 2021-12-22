import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../';
import { catchError } from 'rxjs/operators';

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

  reqAuth({ name, password }: User, type: 'login' | 'signin'): Observable<any> {
    return this.http.post(
      AUTH_API + type,
      {
        name,
        password,
      },
      httpOptions
    );
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

    // console.log(data);
    // if (data.extensions) {
    //   this.auth = false;
    //   return;
    // }
    // this.tokenStorage.saveToken(data.token);
    // this.tokenStorage.saveUser({ name });

    // this.auth = true;
    // this.router.navigate(['/']);
  }

  login(user: User, callback: Function) {
    this.reqAuth(user, 'login').subscribe(
      this.authHandler(user.name, callback)
    );

    // .subscribe({
    //   next: (data) => {
    //     this.authHandler(data, user.name);
    //     if (callback) callback(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     if (callback) callback(data);
    //     this.auth = false;
    //   },
    // }) ;
  }

  // Ainda não tem uma rota para login na API...
  logout() {
    this.auth = false;
    this.router.navigate(['/login']);
  }

  signin(user: User, callback: Function) {
    this.reqAuth(user, 'signin').subscribe(
      this.authHandler(user.name, callback)
    );

    // .subscribe({
    //   next: (data) => {
    //     this.authHandler(data, user.name);
    //     if (callback) callback(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.auth = false;
    //   },
    // });
  }

  isAuth() {
    return this.auth;
  }
}
