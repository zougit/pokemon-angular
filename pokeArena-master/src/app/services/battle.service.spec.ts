import { TestBed } from '@angular/core/testing';

import { RandomBattleService } from './randomBattle.service';

describe('BattleService', () => {
  let service: RandomBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(RandomBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
