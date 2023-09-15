import { TestBed } from '@angular/core/testing';

import {expect} from '@jest/globals';

import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
