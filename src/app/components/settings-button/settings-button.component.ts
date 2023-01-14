import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';
import {
  SettingsService,
  UpdateIntervalType,
} from '../../services/settings.service';

interface UpdateIntervalOption {
  value: UpdateIntervalType;
  selected: boolean;
}

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss'],
})
export class SettingsButtonComponent implements OnInit {
  updateIntervalOptions$?: Observable<Array<UpdateIntervalOption>>;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.updateIntervalOptions$ = this.settingsService.updateInterval$.pipe(
      map((x) => [
        { value: 1, selected: 1 === x },
        { value: 3, selected: 3 === x },
        { value: 10, selected: 10 === x },
      ])
    );
  }

  setUpdateInterval(value: UpdateIntervalType): void {
    this.settingsService.updateInterval = value;
  }

  logout(): void {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe();
  }
}
