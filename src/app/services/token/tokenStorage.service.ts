import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  storage = window.sessionStorage;
  constructor() {}

  signOut(): void {
    this.storage.clear();
  }

  public saveToken(token: string): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return this.storage.getItem(TOKEN_KEY);
  }

  public saveUser(username: { name: string }): void {
    this.storage.removeItem(USER_KEY);
    this.storage.setItem(USER_KEY, JSON.stringify(username));
  }

  public getUser(): any {
    const user = this.storage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
