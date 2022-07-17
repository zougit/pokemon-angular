import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from 'src/app/services/pokemon.service';

import { PokeChoiceComponent } from './poke-choice.component';

describe('PokeChoiceComponent', () => {
  let component: PokeChoiceComponent;
  let fixture: ComponentFixture<PokeChoiceComponent>;
  let pokeServiceStub: Partial<PokemonService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ PokeChoiceComponent ],
      providers: [ { provide: PokemonService, useValue: pokeServiceStub } ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
