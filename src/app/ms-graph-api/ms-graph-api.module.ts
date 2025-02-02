import { makeEnvironmentProviders, NgModule } from '@angular/core';
import { ODataModule } from 'angular-odata';
import { msGraphApiConfig } from './ms-graph-api.config';
import { UserService } from './services/user.service';
import { UsersService } from './services/users.service';

// Standalone version
export const providerMsGraphApi = () =>
  makeEnvironmentProviders([UserService, UsersService]);

// Module version
@NgModule({
  imports: [ODataModule.forRoot({ config: msGraphApiConfig })],
  exports: [ODataModule],
  providers: [UserService, UsersService],
})
export class MsGraphApiModule {}
