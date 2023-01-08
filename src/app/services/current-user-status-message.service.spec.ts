import { TestBed } from '@angular/core/testing';

import { CurrentUserStatusMessageService } from './current-user-status-message.service';

describe('CurrentUserStatusMessageService', () => {
  let service: CurrentUserStatusMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserStatusMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
