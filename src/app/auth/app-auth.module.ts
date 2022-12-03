import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { msGraphConfig } from './ms-graph.config';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: msGraphConfig,
    }),
  ],
  exports: [AuthModule],
})
export class AppAuthModule {}
