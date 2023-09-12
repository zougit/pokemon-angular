import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(BattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
