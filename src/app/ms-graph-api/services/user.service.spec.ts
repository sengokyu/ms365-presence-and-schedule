import { TestBed } from '@angular/core/testing';
import { ODataClient } from 'angular-odata';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let oDataClient;

  beforeEach(() => {
    oDataClient = jasmine.createSpyObj<ODataClient>(['singleton']);

    TestBed.configureTestingModule({
      providers: [{ provide: ODataClient, useValue: oDataClient }, UserService],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
