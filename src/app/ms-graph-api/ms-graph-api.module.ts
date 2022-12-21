import { NgModule } from '@angular/core';
import { ODataModule } from 'angular-odata';
import { msGraphApiConfig } from './ms-graph-api.config';
import { PersonsService } from './services/persons.service';
import { UserService } from './services/user.service';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [ODataModule.forRoot(...msGraphApiConfig)],
  exports: [ODataModule],
  providers: [PersonsService, UserService, UsersService],
})
export class MsGraphApiModule {}
