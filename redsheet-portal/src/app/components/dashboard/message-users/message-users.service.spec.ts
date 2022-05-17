import { TestBed, inject } from '@angular/core/testing';

import { MessageUsersService } from './message-users.service';

describe('MessageUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageUsersService]
    });
  });

  it('should be created', inject([MessageUsersService], (service: MessageUsersService) => {
    expect(service).toBeTruthy();
  }));
});
