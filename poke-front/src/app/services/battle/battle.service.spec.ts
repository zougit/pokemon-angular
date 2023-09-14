import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { Move } from 'src/app/models/move.model';
import { BattleInfoProps } from 'src/app/models/battleLog.model';

describe('BattleService', () => {
  let battleService: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      teardown: { destroyAfterEach: false },
    });
    battleService = TestBed.inject(BattleService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(battleService).toBeTruthy();
  });

  it('should add players with names', () => {
    const playerNames = ['Player 1', 'Player 2'];

    battleService.addPlayers(playerNames);

    expect(BattleService.player[0]).toEqual('Player 1');
    expect(BattleService.player[1]).toEqual('Player 2');
  });

  it('should add Pokemon groups', () => {
    const pokemonIds = [
      [1, 2],
      [3, 4],
    ];

    battleService.addPokemons(pokemonIds).subscribe((result: Pokemon[][]) => {
      expect(result.length).toEqual(2); // Two groups of Pokemon
      expect(result[0].length).toEqual(2); // Two Pokemon in the first group

      // Add more assertions to check the state of Pokemon and their levels
    });
  });

  it('should determine who is more speed', () => {
    // Mock Pokemon objects with different speeds
    const pokemon1 = new Pokemon({
      name: 'squirtle',
      lvl: 99,
      hp: 4356,
      hpMax: 4356,
      exp: 3436,
      expMax: 4455,
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
    });
    pokemon1.speed = 80;

    const pokemon2 = new Pokemon({
      name: 'wartortle',
      lvl: 99,
      hp: 5841,
      hpMax: 5841,
      exp: 3436,
      expMax: 4455,
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
    });

    pokemon2.speed = 100;

    battleService.pokemons = [[pokemon1], [pokemon2]];
    battleService.currpoke = [0, 0];

    const result = battleService.whoIsMoreSpeed();

    expect(result).toEqual(1); // Player 2's Pokemon is faster
  });

  it('should determine the winner and loser of the battle', () => {
    // Create mock Pokemon objects with different stats
    const pokemon1 = new Pokemon({
      name: 'squirtle',
      lvl: 99,
      hp: 4356,
      hpMax: 4356,
      exp: 3436,
      expMax: 4455,
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
    });
    const pokemon2 = new Pokemon({
      name: 'wartortle',
      lvl: 99,
      hp: 5841,
      hpMax: 5841,
      exp: 3436,
      expMax: 4455,
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
    });

    // Set up the initial state of the battle
    battleService.addPlayers(['Player 1', 'Player 2']);
    battleService.pokemons = [[pokemon1], [pokemon2]];
    battleService.currpoke = [0, 0];

    // Simulate a battle where one Pokemon wins and the other loses
    battleService.battle().subscribe((battleInfo: BattleInfoProps) => {
      // Expect one player to win and the other to lose
      expect(battleService.whoWin()).not.toEqual(-1);

      // Add more assertions to check the state of Pokemon and battle log
    });
  });

  it('should calculate average level of Pokemon', () => {
    // Create mock Pokemon objects with different levels
    const pokemon1 = new Pokemon({
      name: 'squirtle',
      lvl: 99,
      hp: 4356,
      hpMax: 4356,
      exp: 3436,
      expMax: 4455,
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
    });
    const pokemon2 = new Pokemon({
      name: 'wartortle',
      lvl: 70,
      hp: 5841,
      hpMax: 5841,
      exp: 3436,
      expMax: 4455,
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
    });

    // Set their levels
    pokemon1.lvl = 50;
    pokemon2.lvl = 60;

    // Set up the initial state of the battle
    battleService.pokemons = [[], [pokemon1, pokemon2]];

    const avgLevel = battleService.moyenneLvl();

    // Expect the average level to be calculated correctly
    expect(avgLevel).toEqual(55); // (50 + 60) / 2 = 55
  });

  it('should level up a Pokemon when it reaches enough experience', () => {
    // Create a mock Pokemon object
    const pokemon = new Pokemon({
      name: 'squirtle',
      lvl: 99,
      hp: 4356,
      hpMax: 4356,
      exp: 3436,
      expMax: 4455,
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
    });
    // Set the Pokemon's level and experience
    pokemon.lvl = 15;
    pokemon.exp = 200;
    pokemon.expMax = 200;

    // Set up the initial state of the battle
    battleService.pokemons = [[pokemon]];
    battleService.currpoke = [0];

    // Call the lvling method to level up the Pokemon
    battleService.lvling();

    // Expect the Pokemon to level up and experience to reset
    expect(pokemon.lvl).toEqual(16);
    expect(pokemon.exp).toEqual(0);
    expect(pokemon.expMax).toEqual(210); // Increased experience cap
  });

  it('should correctly calculate damage inflicted by a move', () => {
    // Create mock Pokemon objects for attacker and defender
    const attacker = new Pokemon({
      name: 'squirtle',
      lvl: 99,
      hp: 4356,
      hpMax: 4356,
      exp: 3436,
      expMax: 4455,
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
    });
    const defender = new Pokemon({
      name: 'wartortle',
      lvl: 70,
      hp: 5841,
      hpMax: 5841,
      exp: 3436,
      expMax: 4455,
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
    });

    // Set their stats
    attacker.atk = 100;
    defender.def = 80;

    // Create a mock move with a power value
    const move = new Move({
      name: 'skull-bash',
      accuracy: 100,
      power: 130,
      pp: 10,
      type: 'normal',
    });
    move.power = 50;

    // Set up the initial state of the battle
    battleService.pokemons = [[attacker], [defender]];
    battleService.currpoke = [0, 0];

    // Calculate damage and expect it to be correct
    const damage = battleService.calculDamage(0, 1, move);
    expect(damage).toEqual(20); // (50 * 100 * 50) / (80 * 100) = 50
  });

  it('should correctly determine the winner of a battle', () => {
    // Create mock Pokemon objects for both players
    const player1Pokemon = ({hp:0} as Pokemon);
    const player2Pokemon = ({hp:0} as Pokemon);

    // Set their HP to simulate a battle outcome
    player1Pokemon.hp = 10;
    player2Pokemon.hp = 0;

    // Set up the initial state of the battle
    battleService.pokemons = [[player1Pokemon], [player2Pokemon]];
    battleService.currpoke = [0, 0];

    // Determine the winner and expect it to be player 1 (0)
    const winner = battleService.whoWin();
    expect(winner).toEqual(0);
    
    // Set up the initial state of the battle
    battleService.pokemons = [[player2Pokemon], [player1Pokemon]];
    battleService.currpoke = [0, 0];

    // Determine the winner and expect it to be player 1 (0)
    const winner2 = battleService.whoWin();
    expect(winner2).toEqual(1);
  });

  it('should correctly determine the winning team of a battle', () => {
    // Create mock Pokemon objects for both players
    const player1Pokemon1 = ({hp:0} as Pokemon);
    const player1Pokemon2 = ({hp:0} as Pokemon);
    const player2Pokemon1 = ({hp:0} as Pokemon);
    const player2Pokemon2 = ({hp:0} as Pokemon);

    // Set their HP to simulate a battle outcome
    player1Pokemon1.hp = 0;
    player1Pokemon2.hp = 0;
    player2Pokemon1.hp = 10;
    player2Pokemon2.hp = 10;

    // Set up the initial state of the battle
    battleService.pokemons = [
      [player1Pokemon1, player1Pokemon2],
      [player2Pokemon1, player2Pokemon2],
    ];
    battleService.currpoke = [0, 0];

    // Determine the winning team and expect it to be team 2 (1)
    const winnerTeam = battleService.whichTeamWin();
    expect(winnerTeam).toEqual(1);
    
    player1Pokemon1.hp = 0;
    player1Pokemon2.hp = 0;
    player2Pokemon1.hp = 10;
    player2Pokemon2.hp = 10;

    // Set up the initial state of the battle
    battleService.pokemons = [
      [player2Pokemon1, player2Pokemon2],
      [player1Pokemon1, player1Pokemon2],
    ];
    battleService.currpoke = [0, 0];

    // Determine the winning team and expect it to be team 2 (1)
    const winnerTeam2 = battleService.whichTeamWin();
    expect(winnerTeam2).toEqual(0);
  });
});
