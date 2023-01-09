import { TestBed } from '@angular/core/testing';

import { UserService } from '../ms-graph-api/services/user.service';
import { CurrentUserStatusMessageService } from './current-user-status-message.service';

describe('CurrentUserStatusMessageService', () => {
  let service: CurrentUserStatusMessageService;
  let userService;

  beforeEach(() => {
    userService = jasmine.createSpyObj<UserService>([
      'getPresence',
      'setStatusMessage',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userService }],
    });
    service = TestBed.inject(CurrentUserStatusMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
