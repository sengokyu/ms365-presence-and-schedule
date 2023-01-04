import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  editMode = false;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  logout(): void {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe();
  }
}
