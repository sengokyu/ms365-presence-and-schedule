import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { UserEntity, UsersService } from '../../ms-graph-api';
import { FollowingService } from '../../services/following.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let spectator: Spectator<UserListComponent>;
  const createComponent = createComponentFactory({
    component: UserListComponent,
    imports: [
      ReactiveFormsModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatTableModule,
      MatToolbarModule,
    ],
  });
  let usersService;
  let followingService;

  beforeEach(() => {
    usersService = jasmine.createSpyObj<UsersService>(['getUsers']);
    followingService = jasmine.createSpyObj<FollowingService>(['addFollowing']);

    // ToDo: 意味のあるものを返す
    usersService.getUsers.and.returnValue(
      jasmine.createSpyObj<Observable<Array<UserEntity>>>(['subscribe'])
    );

    spectator = createComponent({
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: FollowingService, useValue: followingService },
      ],
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
