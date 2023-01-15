import { Component, OnDestroy, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();

  editMode = false;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.subscription.add(
      interval(3600 * 1000)
        .pipe(switchMap(() => this.oidcSecurityService.forceRefreshSession()))
        .subscribe((result) => {
          console.debug('Session refreshed. result:' + result);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
