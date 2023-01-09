import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let oidcSecurityService;

  beforeEach(async () => {
    oidcSecurityService = jasmine.createSpyObj<OidcSecurityService>([
      'logoffAndRevokeTokens',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
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
