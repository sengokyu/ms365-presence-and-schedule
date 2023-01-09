import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersService } from '../../ms-graph-api';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let usersService;

  beforeEach(async () => {
    usersService = jasmine.createSpyObj<UsersService>(['getProfilePhoto']);

    await TestBed.configureTestingModule({
      declarations: [AvatarComponent],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
