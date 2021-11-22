import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements CanActivate {
  auth: boolean = false;

  users: User[] = [{ name: 'Zé', password: '123456' }];

  constructor(private router: Router) {}

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

  checkUser(user: User): boolean {
    return (
      this.users.findIndex(
        (dbUser) => user.name == dbUser.name && user.password == dbUser.password
      ) > -1
    );
  }

  login(user: User): boolean {
    if (this.checkUser(user)) {
      this.router.navigate(['/']);
      this.auth = true;
      return this.auth;
    }
    return false;
  }

  logout() {
    this.auth = false;
    this.router.navigate(['/login']);
  }

  signin(user: User): boolean {
    if (user.name && user.password) {
      return true;
    }
    return false;
  }

  isAuth() {
    return this.auth;
  }
}
