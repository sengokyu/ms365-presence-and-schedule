import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HomeComponent } from './home.component';

@Directive({
    selector: 'app-following-list',
    standalone: false
})
class FakeFollowingList {
  @Input()
  editMode?: boolean;
}

@Directive({
    selector: 'app-status-message-bar',
    standalone: false
})
class FakeStatusMessageBar {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let oidcSecurityService;

  beforeEach(async () => {
    oidcSecurityService = jasmine.createSpyObj<OidcSecurityService>([
      'logoffAndRevokeTokens',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FakeFollowingList, FakeStatusMessageBar, HomeComponent],
      imports: [MatIconModule, MatMenuModule, MatToolbarModule],
      providers: [
        { provide: OidcSecurityService, useValue: oidcSecurityService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
