import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppAuthModule } from './auth/app-auth.module';
import { EventOfTodayComponent } from './components/event-of-today/event-of-today.component';
import { PresenceComponent } from './components/presence/presence.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    EventOfTodayComponent,
    PresenceComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AppAuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
