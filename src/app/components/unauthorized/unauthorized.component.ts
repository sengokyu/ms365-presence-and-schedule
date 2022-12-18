import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  login(): void {
    this.oidcSecurityService.authorize();
  }
}
