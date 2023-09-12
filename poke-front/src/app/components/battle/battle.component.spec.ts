import { ComponentFixture, TestBed } from '@angular/core/testing';

import { battleComponent } from './battle.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { BattleService } from 'src/app/services/battle/battle.service';

describe('battleComponent', () => {
  let component: battleComponent;
  let fixture: ComponentFixture<battleComponent>;
  let battleservice: BattleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
      ],
      declarations: [battleComponent, PokemonComponent],
      providers: [BattleService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
    battleservice = TestBed.inject(BattleService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(battleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    battleservice.pokemonsIdSub.next([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve poke ids', () => {
    expect(component.pokemonsId).toBeTruthy();
  });

  it('should add pokemon', () => {
    expect(component.pokemons).toBeTruthy();
  });

});
