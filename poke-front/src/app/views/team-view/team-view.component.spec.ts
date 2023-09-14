import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamViewComponent } from './team-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { TeamService } from 'src/app/services/team/team.service';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { Team } from 'src/app/models/team.model';
import { User } from 'src/app/models/user.model';
import { Move } from 'src/app/models/move.model';

const matDialogMock = {
  open: () => ({ afterClosed: () => of({}) }),
};

describe('TeamViewComponent', () => {
  let component: TeamViewComponent;
  let fixture: ComponentFixture<TeamViewComponent>;
  let teamService: TeamService;
  let pokeService: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
        NgbModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      declarations: [TeamViewComponent],
      providers: [
        TeamService,
        PokemonService,
        { provide: MatDialog, useValue: matDialogMock },
      ],
    });
    fixture = TestBed.createComponent(TeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    teamService = TestBed.inject(TeamService);
    pokeService = TestBed.inject(PokemonService);
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user and load team on ngOnInit', () => {
    const mockUser = {
      id: 1,
      teams: [{ id: 1 }],
    };
    const mockTeam = {
      /* Replace with your mock team data */
    };
    const mockPoke: Pokemon = new Pokemon({
      name: '',
      lvl: 0,
      exp: 0,
      expMax: 0,
      hp: 0,
      hpMax: 0,
      atk: 0,
      def: 0,
      spAtk: 0,
      spDef: 0,
      speed: 0,
      type: '',
      moves: [],
      evolution: '',
      tier: 0,
      id: 0,
    });

    // Mock the behavior of localStorage.getItem
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(mockUser));

    // Mock the behavior of teamService.getTeam
    jest.spyOn(teamService, 'getTeam').mockReturnValue(of(mockTeam));

    // Mock the behavior of pokeService.getPokemonById
    jest.spyOn(pokeService, 'getPokemonById').mockReturnValue(of(mockPoke));

    component.ngOnInit();

    expect(Storage.prototype.getItem).toHaveBeenCalledWith('user');
    expect(teamService.getTeam).toHaveBeenCalledWith(mockUser.id);
    // expect(pokeService.getPokemonById).toHaveBeenCalledWith(mockUser.teams[0].id);
  });

  it('should open a dialog when onAdd is called', () => {
    // Mock the behavior of MatDialog open and afterClosed methods
    jest
      .spyOn(matDialogMock, 'open')
      .mockReturnValue({ afterClosed: () => of({}) });

    component.onAdd();

    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('should add a Pokemon to the team when the dialog returns a result', () => {
    const mockDialogResult = { id_poke: 1, team_id: 1, lvl: 5, exp: 0, expMax: 100 };
    const mockPoke: Pokemon = new Pokemon({
      name: '',
      lvl: 0,
      exp: 0,
      expMax: 0,
      hp: 0,
      hpMax: 0,
      atk: 0,
      def: 0,
      spAtk: 0,
      spDef: 0,
      speed: 0,
      type: '',
      moves: [],
      evolution: '',
      tier: 0,
      id: 0,
    });
    // Mock the behavior of dialog.open
    const mockDialogRef = { afterClosed: () => of(mockDialogResult) };

    jest.spyOn(matDialogMock, 'open').mockReturnValue(mockDialogRef);

    // Mock the behavior of pokeService.getPokemonById
    jest.spyOn(pokeService, 'getPokemonById').mockReturnValue(of(mockPoke));

    // Mock the behavior of teamService.addPokeTeam
    const teamServiceAddPokeTeamSpy = jest.spyOn(teamService, 'addPokeTeam').mockReturnValue(of({}).subscribe());

    component.onAdd();

    expect(pokeService.getPokemonById).toHaveBeenCalledWith(mockDialogResult.id_poke);
    expect(teamServiceAddPokeTeamSpy).toHaveBeenCalledWith(mockDialogResult);
    // Add more assertions related to adding a Pokemon to the team as needed
  });

  it('should delete a Pokemon when onDelete is called', () => {
    const mockPoke: Pokemon = new Pokemon({
      name: '',
      lvl: 0,
      exp: 0,
      expMax: 0,
      hp: 0,
      hpMax: 0,
      atk: 0,
      def: 0,
      spAtk: 0,
      spDef: 0,
      speed: 0,
      type: '',
      moves: [],
      evolution: '',
      tier: 0,
      id: 0,
    });
    component.pokeTeam.pokemons = [{} as Pokemon, {} as Pokemon];

    // Mock the behavior of teamService.delPokeTeam
    jest.spyOn(teamService, 'delPokeTeam').mockReturnValue(of({}).subscribe());

    component.onDelete(0, mockPoke);

    expect(teamService.delPokeTeam).toHaveBeenCalled();
  });

  it('should update the selected Pokemon when onClick is called', () => {
    const mockPoke: Pokemon = new Pokemon({
      name: '',
      lvl: 0,
      exp: 0,
      expMax: 0,
      hp: 0,
      hpMax: 0,
      atk: 0,
      def: 0,
      spAtk: 0,
      spDef: 0,
      speed: 0,
      type: '',
      moves: [],
      evolution: '',
      tier: 0,
      id: 0,
    });
    component.isdel = false;
    component.pokeTeam.pokemons = [
      new Pokemon({
        name: '',
        lvl: 0,
        exp: 0,
        expMax: 0,
        hp: 0,
        hpMax: 0,
        atk: 0,
        def: 0,
        spAtk: 0,
        spDef: 0,
        speed: 0,
        type: '',
        moves: [],
        evolution: '',
        tier: 0,
        id: 0,
      }),
    ];
    component.onClick(0);

    expect(component.pokemon).toEqual(mockPoke);
  });
});
