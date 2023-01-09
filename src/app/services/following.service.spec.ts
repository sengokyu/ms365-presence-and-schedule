import { TestBed } from '@angular/core/testing';

import { FollowingService } from './following.service';
import { LocalStorageService } from '@practical-angular/local-storage';

describe('FollowingService', () => {
  let service: FollowingService;
  let localStorageService;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj<LocalStorageService>([
      'getItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageService },
      ],
    });
    service = TestBed.inject(FollowingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
