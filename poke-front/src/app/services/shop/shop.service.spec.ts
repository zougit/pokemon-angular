import { TestBed } from '@angular/core/testing';

import { ShopService } from './shop.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
