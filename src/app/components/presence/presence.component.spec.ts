import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserEntity, UsersService } from '../../ms-graph-api';
import { FollowingService } from '../../services/following.service';
import { PresenceComponent } from './presence.component';

describe('PresenceComponent', () => {
  let spectator: Spectator<PresenceComponent>;
  const createComponent = createComponentFactory({
    component: PresenceComponent,
    imports: [MatCardModule, MatProgressBarModule],
  });
  let usersService;
  let followingService;

  beforeEach(() => {
    usersService = jasmine.createSpyObj<UsersService>(['getPresence']);
    followingService = jasmine.createSpyObj<FollowingService>([
      'removeFollowing',
    ]);

    const user: UserEntity = {
      id: 'hoge',
      displayName: '',
      department: '',
      mail: '',
      userPrincipalName: '',
    };

    spectator = createComponent({
      props: { user },
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
