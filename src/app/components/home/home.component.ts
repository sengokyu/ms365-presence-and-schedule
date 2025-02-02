import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { FollowingListComponent } from '../following-list/following-list.component';
import { SettingsButtonComponent } from '../settings-button/settings-button.component';
import { StatusMessageBarComponent } from '../status-message-bar/status-message-bar.component';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    FollowingListComponent,
    SettingsButtonComponent,
    StatusMessageBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  editMode = false;

  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    const url = domSanitizer.bypassSecurityTrustResourceUrl(
      '../assets/icons/people_delete_add.svg',
    );
    iconRegistry.addSvgIcon('people_delete_add', url);
  }
}
