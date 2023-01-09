import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersService } from '../../ms-graph-api';
import { FollowingService } from '../../services/following.service';
import { PresenceComponent } from './presence.component';

describe('PresenceComponent', () => {
  let component: PresenceComponent;
  let fixture: ComponentFixture<PresenceComponent>;
  let usersService;
  let followingService;

  beforeEach(async () => {
    usersService = jasmine.createSpyObj<UsersService>(['getPresence']);
    followingService = jasmine.createSpyObj<FollowingService>([
      'removeFollowing',
    ]);

    await TestBed.configureTestingModule({
      declarations: [PresenceComponent],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: FollowingService, useValue: followingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
