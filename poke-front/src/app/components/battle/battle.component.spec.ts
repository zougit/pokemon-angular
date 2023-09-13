import { ComponentFixture, TestBed } from '@angular/core/testing';

import { battleComponent } from './battle.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { BattleService } from 'src/app/services/battle/battle.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { of } from 'rxjs';

describe('battleComponent', () => {
  let component: battleComponent;
  let fixture: ComponentFixture<battleComponent>;
  let battleService: BattleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
      ],
      declarations: [battleComponent, PokemonComponent],
      providers: [BattleService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
    battleService = TestBed.inject(BattleService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(battleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    battleService.pokemonsIdSub.next([
      [1, 2, 7, 8, 9],
      [2, 3, 8, 7, 6],
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive pokemonsId', () => {
    const pokemonsId: number[][] = [
      [1, 2, 7, 8, 9],
      [2, 3, 8, 7, 6],
    ];
    expect(component.pokemonsId).toEqual(pokemonsId);
  });

  it('should initialize pokemons correctly when pokemonsId is available', () => {
    const mockPokemons = [
      [
        {
          name: 'bulbasaur',
          lvl: 99,
          hp: 3436,
          hpMax: 4455,
          atk: 480,
          def: 480,
          spAtk: 637,
          spDef: 637,
          speed: 441,
          type: 'grass',
          evolution: 'ivysaur',
          tier: 1,
          id: 1,
          moves: [
            {
              name: 'confide',
              accuracy: null,
              power: null,
              pp: 20,
              type: 'normal',
            },
            {
              name: 'double-edge',
              accuracy: 100,
              power: 120,
              pp: 15,
              type: 'normal',
            },
            {
              name: 'grass-whistle',
              accuracy: 55,
              power: null,
              pp: 15,
              type: 'grass',
            },
            {
              name: 'grass-knot',
              accuracy: 100,
              power: null,
              pp: 20,
              type: 'grass',
            },
          ],
        },
        {
          name: 'ivysaur',
          lvl: 99,
          hp: 5940,
          hpMax: 5940,
          atk: 607,
          def: 617,
          spAtk: 784,
          spDef: 784,
          speed: 588,
          type: 'grass',
          evolution: 'venusaur',
          tier: 2,
          id: 2,
          moves: [
            {
              name: 'mud-slap',
              accuracy: 100,
              power: 20,
              pp: 10,
              type: 'ground',
            },
            {
              name: 'mega-drain',
              accuracy: 100,
              power: 40,
              pp: 15,
              type: 'grass',
            },
            {
              name: 'string-shot',
              accuracy: 95,
              power: null,
              pp: 40,
              type: 'bug',
            },
            {
              name: 'rock-smash',
              accuracy: 100,
              power: 40,
              pp: 15,
              type: 'fighting',
            },
          ],
        },
        {
          name: 'squirtle',
          lvl: 99,
          hp: 4356,
          hpMax: 4356,
          atk: 470,
          def: 637,
          spAtk: 490,
          spDef: 627,
          speed: 421,
          type: 'water',
          evolution: 'wartortle',
          tier: 1,
          id: 7,
          moves: [
            {
              name: 'round',
              accuracy: 100,
              power: 60,
              pp: 15,
              type: 'normal',
            },
            {
              name: 'aqua-tail',
              accuracy: 90,
              power: 90,
              pp: 10,
              type: 'water',
            },
            {
              name: 'defense-curl',
              accuracy: null,
              power: null,
              pp: 40,
              type: 'normal',
            },
            {
              name: 'rapid-spin',
              accuracy: 100,
              power: 50,
              pp: 40,
              type: 'normal',
            },
          ],
        },
        {
          name: 'wartortle',
          lvl: 99,
          hp: 5841,
          hpMax: 5841,
          atk: 617,
          def: 784,
          spAtk: 637,
          spDef: 784,
          speed: 568,
          type: 'water',
          evolution: 'blastoise',
          tier: 2,
          id: 8,
          moves: [
            {
              name: 'body-slam',
              accuracy: 100,
              power: 85,
              pp: 15,
              type: 'normal',
            },
            {
              name: 'captivate',
              accuracy: 100,
              power: null,
              pp: 20,
              type: 'normal',
            },
            {
              name: 'skull-bash',
              accuracy: 100,
              power: 130,
              pp: 10,
              type: 'normal',
            },
            {
              name: 'double-team',
              accuracy: null,
              power: null,
              pp: 15,
              type: 'normal',
            },
          ],
        },
        {
          name: 'blastoise',
          lvl: 99,
          hp: 7821,
          hpMax: 7821,
          atk: 813,
          def: 980,
          spAtk: 833,
          spDef: 1029,
          speed: 764,
          type: 'water',
          evolution: '',
          tier: 3,
          id: 9,
          moves: [
            {
              name: 'flash-cannon',
              accuracy: 100,
              power: 80,
              pp: 10,
              type: 'steel',
            },
            {
              name: 'round',
              accuracy: 100,
              power: 60,
              pp: 15,
              type: 'normal',
            },
            {
              name: 'hyper-beam',
              accuracy: 90,
              power: 150,
              pp: 5,
              type: 'normal',
            },
            {
              name: 'curse',
              accuracy: null,
              power: null,
              pp: 10,
              type: 'ghost',
            },
          ],
        },
      ],
      [
        {
          name: 'ivysaur',
          lvl: 99,
          hp: 5940,
          hpMax: 5940,
          atk: 607,
          def: 617,
          spAtk: 784,
          spDef: 784,
          speed: 588,
          type: 'grass',
          evolution: 'venusaur',
          tier: 2,
          id: 2,
          moves: [
            {
              name: 'worry-seed',
              accuracy: 100,
              power: null,
              pp: 10,
              type: 'grass',
            },
            {
              name: 'cut',
              accuracy: 95,
              power: 50,
              pp: 30,
              type: 'normal',
            },
            {
              name: 'synthesis',
              accuracy: null,
              power: null,
              pp: 5,
              type: 'grass',
            },
            {
              name: 'facade',
              accuracy: 100,
              power: 70,
              pp: 20,
              type: 'normal',
            },
          ],
        },
        {
          name: 'venusaur',
          lvl: 99,
          hp: 7920,
          hpMax: 7920,
          atk: 803,
          def: 813,
          spAtk: 980,
          spDef: 980,
          speed: 784,
          type: 'grass',
          evolution: '',
          tier: 3,
          id: 3,
          moves: [
            {
              name: 'return',
              accuracy: 100,
              power: null,
              pp: 20,
              type: 'normal',
            },
            {
              name: 'terrain-pulse',
              accuracy: 100,
              power: 50,
              pp: 10,
              type: 'normal',
            },
            {
              name: 'poison-powder',
              accuracy: 75,
              power: null,
              pp: 35,
              type: 'poison',
            },
            {
              name: 'toxic',
              accuracy: 90,
              power: null,
              pp: 10,
              type: 'poison',
            },
          ],
        },
        {
          name: 'wartortle',
          lvl: 99,
          hp: 5841,
          hpMax: 5841,
          atk: 617,
          def: 784,
          spAtk: 637,
          spDef: 784,
          speed: 568,
          type: 'water',
          evolution: 'blastoise',
          tier: 2,
          id: 8,
          moves: [
            {
              name: 'dynamic-punch',
              accuracy: 50,
              power: 100,
              pp: 5,
              type: 'fighting',
            },
            {
              name: 'take-down',
              accuracy: 85,
              power: 90,
              pp: 20,
              type: 'normal',
            },
            {
              name: 'rock-smash',
              accuracy: 100,
              power: 40,
              pp: 15,
              type: 'fighting',
            },
            {
              name: 'sleep-talk',
              accuracy: null,
              power: null,
              pp: 10,
              type: 'normal',
            },
          ],
        },
        {
          name: 'squirtle',
          lvl: 99,
          hp: 4356,
          hpMax: 4356,
          atk: 470,
          def: 637,
          spAtk: 490,
          spDef: 627,
          speed: 421,
          type: 'water',
          evolution: 'wartortle',
          tier: 1,
          id: 7,
          moves: [
            {
              name: 'tackle',
              accuracy: 100,
              power: 40,
              pp: 35,
              type: 'normal',
            },
            {
              name: 'confide',
              accuracy: null,
              power: null,
              pp: 20,
              type: 'normal',
            },
            {
              name: 'snore',
              accuracy: 100,
              power: 50,
              pp: 15,
              type: 'normal',
            },
            {
              name: 'flip-turn',
              accuracy: 100,
              power: 60,
              pp: 20,
              type: 'water',
            },
          ],
        },
        {
          name: 'charizard',
          lvl: 99,
          hp: 7722,
          hpMax: 7722,
          atk: 823,
          def: 764,
          spAtk: 1068,
          spDef: 833,
          speed: 980,
          type: 'fire',
          evolution: '',
          tier: 3,
          id: 6,
          moves: [
            {
              name: 'rock-tomb',
              accuracy: 95,
              power: 60,
              pp: 15,
              type: 'rock',
            },
            {
              name: 'dragon-rage',
              accuracy: 100,
              power: null,
              pp: 10,
              type: 'dragon',
            },
            {
              name: 'snore',
              accuracy: 100,
              power: 50,
              pp: 15,
              type: 'normal',
            },
            {
              name: 'overheat',
              accuracy: 90,
              power: 130,
              pp: 5,
              type: 'fire',
            },
          ],
        },
      ],
    ];

    jest
      .spyOn(battleService, 'addPokemons')
      .mockReturnValue(of(mockPokemons as Pokemon[][]));

    component.ngOnInit();

    expect(component.pokemons).toEqual(mockPokemons);
  });
});
