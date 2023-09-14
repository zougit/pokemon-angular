import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

import { PokeChoiceComponent } from './poke-choice.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokeChoiceComponent', () => {
  let component: PokeChoiceComponent;
  let fixture: ComponentFixture<PokeChoiceComponent>;
  let pokeServiceStub: Partial<PokemonService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
      ],
      declarations: [PokeChoiceComponent],
      providers: [PokemonService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(PokeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pokeCards and pokemonPlayer arrays', () => {
    expect(component.pokeCards).toEqual([]);
    expect(component.pokemonPlayer[0]).toEqual([]);
    expect(component.pokemonPlayer[1]).toEqual([]);
  });

  it('should add selected cards for player 1', () => {
    component.selectPoke(0, 1);
    expect(component.pokemonPlayer[0]).toEqual([1]);
    expect(component.selectedCardsPlayer1[1]).toBe(true);
  });
  
  it('should remove selected cards for player 2', () => {
    component.selectPoke(1, 2);
    component.selectPoke(1, 2); // Deselect the card
    expect(component.pokemonPlayer[1]).toEqual([]);
    expect(component.selectedCardsPlayer2[2]).toBe(false);
  });
});
