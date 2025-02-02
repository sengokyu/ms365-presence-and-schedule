import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FollowingListComponent } from '../following-list/following-list.component';
import { SettingsButtonComponent } from '../settings-button/settings-button.component';
import { StatusMessageBarComponent } from '../status-message-bar/status-message-bar.component';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    MatToolbarModule,
    SettingsButtonComponent,
    FollowingListComponent,
    StatusMessageBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  editMode = false;
}
