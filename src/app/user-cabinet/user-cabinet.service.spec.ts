import { TestBed } from '@angular/core/testing';

import { UserCabinetService } from './user-cabinet.service';

describe('UserCabinetService', () => {
  let service: UserCabinetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCabinetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
