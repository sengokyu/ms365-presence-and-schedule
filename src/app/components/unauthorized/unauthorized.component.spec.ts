import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UnauthorizedComponent } from './unauthorized.component';

describe('UnauthorizedComponent', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;
  let oidcSecurityService: jasmine.SpyObj<OidcSecurityService>;

  beforeEach(async () => {
    oidcSecurityService = jasmine.createSpyObj<OidcSecurityService>([
      'authorize',
    ]);

    await TestBed.configureTestingModule({
      declarations: [UnauthorizedComponent],
      imports: [MatButtonModule, MatIconModule, MatToolbarModule],
      providers: [
        { provide: OidcSecurityService, useValue: oidcSecurityService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
