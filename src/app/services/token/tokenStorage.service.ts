import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

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

  saveToken(token: string): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return this.storage.getItem(TOKEN_KEY) || '';
  }

  saveUser(username: { name: string }): void {
    this.storage.removeItem(USER_KEY);
    this.storage.setItem(USER_KEY, JSON.stringify(username));
  }

  getUser(): any {
    const user = this.storage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  getUserId() {
    return jwt_decode<{ id: string }>(this.getToken()).id;
  }
}
