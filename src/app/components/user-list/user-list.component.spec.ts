import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersService } from '../../ms-graph-api';
import { FollowingService } from '../../services/following.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let usersService;
  let followingService;

  beforeEach(async () => {
    usersService = jasmine.createSpyObj<UsersService>(['getUsers']);
    followingService = jasmine.createSpyObj<FollowingService>(['addFollowing']);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [MatIconModule, MatFormFieldModule, MatToolbarModule],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: FollowingService, useValue: followingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
