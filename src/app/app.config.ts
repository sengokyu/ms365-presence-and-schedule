import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { authInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { routes } from './app.routes';
import { authConfig } from './auth/auth.config';
import { provideODataClient } from 'angular-odata';
import { odataConfig } from './odata/odata.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth(authConfig),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideAnimationsAsync(),
    provideODataClient(odataConfig),
  ],
};
