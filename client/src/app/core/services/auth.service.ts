import { Injectable } from '@angular/core';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettingsService } from '../../app-settings.service';
import { SessionService } from './session.service';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url: string = this.appSettings.ACCOUNTS_SERVER;
  apiUrl: string = this.appSettings.API_SERVER;
  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private appSettings: AppSettingsService,
    private session: SessionService,
  ) {
    if (this.session.isLoggedIn) {
      this.setAuth();
    }
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  private transformToFormData(data: object): string {
    const str = Object.entries(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

    return str.join('&');
  }

  private setAuth() {
    this.isAuthenticatedSubject.next(true);
  }

  private purgeAuth() {
    this.isAuthenticatedSubject.next(false);
  }

  login(data: object): Observable<any> {
    const body = this.transformToFormData(data);

    return this.http.post(`${this.url}/oauth/token`, body, {
      headers: this.headers.append('ignoreAuthModule', 'true'),
    })
      .pipe(map(
        res => {
          this.setAuth();
          return res;
        }),
        catchError(this.formatErrors)
      );
  }

  setSessionData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/user/me`)
      .pipe(catchError(this.formatErrors));
  }

  logout(data: object): Observable<any> {
    const body = this.transformToFormData(data);

    return this.http.post(`${this.url}/oauth/revoke`, body, { headers: this.headers })
      .pipe(map(
        res => {
          this.purgeAuth();
          return res;
        }),
        catchError(this.formatErrors)
      );
  }
}
