import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { msAuthConfig } from './ms-auth.config';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: msAuthConfig,
    }),
  ],
  exports: [AuthModule],
})
export class AppAuthModule {}
