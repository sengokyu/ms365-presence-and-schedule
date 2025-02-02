import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-callback',
  imports: [],
  template: ` <p>callback works!</p> `,
  styles: ``,
})
export class CallbackComponent implements OnInit {
  constructor(private readonly oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe({
      next: () => {},
      error: (err) => {
        console.error(err);
      },
    });
  }
}
