import { NgModule } from '@angular/core';
import { ODataModule } from 'angular-odata';
import { msGraphApiConfig } from './ms-graph-api.config';
import { PersonService } from './services/person.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [ODataModule.forRoot(...msGraphApiConfig)],
  exports: [ODataModule],
  providers: [PersonService, UserService],
})
export class MsGraphApiModule {}
