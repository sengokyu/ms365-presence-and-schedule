import { TestBed } from '@angular/core/testing';
import { ODataClient } from 'angular-odata';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let oDataClient;

  beforeEach(() => {
    oDataClient = jasmine.createSpyObj<ODataClient>(['singleton']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ODataClient, useValue: oDataClient },
        UsersService,
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
