import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from '../services/session.service';
import {AppSettingsService} from '../../app-settings.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private session: SessionService,
    private appSetting: AppSettingsService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if (req.url[0] === '/') {
      request = req.clone({
        url: `${this.appSetting.API_SERVER}/api${req.url}`,
      });
    }

    if (request.headers.get('ignoreAuthModule') === 'true') {
      return next.handle(request);
    }

    if (!request.url.indexOf(this.appSetting.API_SERVER) && !this.session.isLoggedIn) {
      const location = window.location;
      const { pathname, search } = location;

      location.href = `${this.appSetting.LOGIN_URL}&state=${pathname}${search}`;
      return null;
    }

    request = request.clone({
      setHeaders: { Authorization: `Bearer ${this.session.accessToken}` },
    });

    return next.handle(request);
  }
}
