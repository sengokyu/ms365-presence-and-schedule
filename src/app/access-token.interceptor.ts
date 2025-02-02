import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const accessTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (!isProtectedUrl(req.url)) {
    return next(req);
  }

  const oidcSecurityService = inject(OidcSecurityService);

  return oidcSecurityService
    .getAccessToken()
    .pipe(map((token) => cloneRequest(req, token)))
    .pipe(switchMap((req) => next(req)));
};

const isProtectedUrl = (url: string): boolean =>
  url.startsWith(STORAGE_API_URL);

const cloneRequest = (
  request: HttpRequest<unknown>,
  token: string,
): HttpRequest<unknown> =>
  request.clone({
    headers: request.headers.set('Authorization', 'Bearer ' + token),
  });
