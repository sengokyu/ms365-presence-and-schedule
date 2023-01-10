import { Observable } from 'rxjs';

import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { UserEntity, UsersService } from '../../ms-graph-api';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let spectator: Spectator<AvatarComponent>;
  const createComponent = createComponentFactory({
    component: AvatarComponent,
  });
  let usersService;

  beforeEach(async () => {
    usersService = jasmine.createSpyObj<UsersService>(['getProfilePhoto']);

    usersService.getProfilePhoto.and.returnValue(
      jasmine.createSpyObj<Observable<Blob | null>>(['pipe'])
    );

    const user: UserEntity = {
      id: 'hoge',
      displayName: '',
      department: '',
      mail: '',
      userPrincipalName: '',
    };

    spectator = createComponent({
      props: { user },
      providers: [{ provide: UsersService, useValue: usersService }],
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
