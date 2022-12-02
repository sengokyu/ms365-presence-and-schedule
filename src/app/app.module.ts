import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EventOfTodayComponent } from './components/event-of-today/event-of-today.component';
import { PresenceComponent } from './components/presence/presence.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    EventOfTodayComponent,
    PresenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
