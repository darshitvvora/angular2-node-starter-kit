import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {
  constructor() { }

  get isLoggedIn(): boolean {
    return !!(this.read('oauth') && this.read('oauth').access_token);
  }

  get accessToken() {
    if (!this.isLoggedIn) return new Error('AccessToken not found');
    return this.read('oauth').access_token;
  }

  read(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  create(key, value): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    return localStorage.removeItem(key);
  }

  destroy(): void {
    localStorage.clear();
  }
}
