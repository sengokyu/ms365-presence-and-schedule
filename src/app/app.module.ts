import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from '@practical-angular/local-storage';

import { AccessTokenInterceptor } from './access-token.interceptor';
import { AppIconsModule } from './app-icons.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppAuthModule } from './auth/app-auth.module';
import { AvailabilityComponent } from './components/availability/availability.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FollowingListComponent } from './components/following-list/following-list.component';
import { HomeComponent } from './components/home/home.component';
import { PresenceComponent } from './components/presence/presence.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { StatusMessageBarComponent } from './components/status-message-bar/status-message-bar.component';
import { StatusMessageFormComponent } from './components/status-message-form/status-message-form.component';
import { StatusMessageComponent } from './components/status-message/status-message.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MsGraphApiModule } from './ms-graph-api';

@NgModule({
  declarations: [
    AppComponent,
    FollowingListComponent,
    HomeComponent,
    PresenceComponent,
    UserListComponent,
    UnauthorizedComponent,
    AvailabilityComponent,
    AvatarComponent,
    ScheduleComponent,
    StatusMessageComponent,
    StatusMessageFormComponent,
    StatusMessageBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    LocalStorageModule,
    AppIconsModule,
    AppRoutingModule,
    AppAuthModule,
    MsGraphApiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
