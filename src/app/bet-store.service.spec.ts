import { TestBed } from '@angular/core/testing';

import { BetStoreService } from './bet-store.service';

describe('BetStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetStoreService = TestBed.get(BetStoreService);
    expect(service).toBeTruthy();
  });
});
