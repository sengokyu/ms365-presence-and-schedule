import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { UserEntity } from 'src/app/ms-graph-api';

import { UserService } from '../../ms-graph-api/services/user.service';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let spectator: Spectator<ScheduleComponent>;
  const createComponent = createComponentFactory({
    component: ScheduleComponent,
  });
  let userService;

  beforeEach(() => {
    userService = jasmine.createSpyObj<UserService>(['getScheduleItems']);

    const user: UserEntity = {
      id: 'hoge',
      displayName: '',
      department: '',
      mail: '',
      userPrincipalName: '',
    };

    spectator = createComponent({
      props: { user },
      providers: [{ provide: UserService, useValue: userService }],
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
