import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppSettingsService {

  API_SERVER: string;
  ACCOUNTS_SERVER: string;
  LOGIN_URL: string;

  constructor(
  ) {
    const { host, protocol } = window.location;
    const PREFIX = `${protocol}//${host.substr(0, host.indexOf('-') + 1)}`;
    const DOMAIN = `${host.substr(host.indexOf('.') + 1)}`;

    this.API_SERVER = `${PREFIX}docs.${DOMAIN}`;
    this.ACCOUNTS_SERVER = `${PREFIX}accounts.${DOMAIN}`;
    this.LOGIN_URL = `${this.ACCOUNTS_SERVER}/signin?client_id=<client_id>`;
  }
}
