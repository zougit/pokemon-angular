import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPokeComponent } from 'src/app/components/dialog-poke/dialog-poke.component';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss'],
})
export class TeamViewComponent implements OnInit, AfterContentChecked {
  nbpoke: number = 0;
  pokeCard!: any[];
  pokemon!: Pokemon;
  pokedb!: any;
  pokeTeam: Pokemon[] = [];
  stats!: any;

  constructor(
    private teamService: TeamService,
    private pokeService: PokemonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamService.getTeam(2).subscribe((v) => {
      // console.log(v);
      v.forEach((poke) => {
        this.pokeService.getPokemonById(poke.id_poke).subscribe((pokemon) => {
          this.pokeTeam.push(pokemon);
          this.pokeTeam.find((x) => x.id == poke.id_poke)!.lvl = poke.lvl;
          this.pokeTeam.find((x) => x.id == poke.id_poke)!.exp = poke.exp;
          this.pokeTeam.find((x) => x.id == poke.id_poke)!.expMax = poke.expMax;
          // console.log(this.pokeTeam);
          this.nbpoke = this.pokeTeam.length;
          this.pokemon = this.pokeTeam[0];
        });
      });
      // this.pokeTeam = v;
    });
    this.pokeService
      .getPokeDbByUser(1)
      .subscribe((poke: any) => (this.pokeCard = poke.data));
  }

  ngAfterContentChecked(): void {
    if (this.pokemon && this.pokeCard && this.pokeTeam) {
      this.stats = [
        { name: 'hp', key: this.pokemon.hp },
        { name: 'hpMax', key: this.pokemon.hpMax },
        { name: 'atk', key: this.pokemon.atk },
        { name: 'def', key: this.pokemon.def },
        { name: 'spAtk', key: this.pokemon.spAtk },
        { name: 'spDef', key: this.pokemon.spDef },
        { name: 'speed', key: this.pokemon.speed },
        { name: 'type', key: this.pokemon.type },
        // { name: 'moves', key: this.pokemon.moves },
      ];
    }
  }

  onAdd() {
    this.pokeCard = this.pokeCard.filter(
      (x) => !this.pokeTeam.find((poke) => poke.id == x.id_poke)
    );

    const dialogRef = this.dialog.open(DialogPokeComponent, {
      data: this.pokeCard,
    });

    // console.log('pokecard ', this.pokeCard);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.pokedb = result;
        this.pokeService.getPokemonById(result.id_poke).subscribe((poke) => {
          this.pokeTeam.push(poke);
          // console.log('poke ', poke);

          this.pokeTeam.find((x) => x.id == poke.id)!.lvl = this.pokedb.lvl;
          this.pokeTeam.find((x) => x.id == poke.id)!.exp = this.pokedb.exp;
          this.pokeTeam.find((x) => x.id == poke.id)!.expMax =
            this.pokedb.expMax;
          // console.log(
          //   'poke find ',
          //   this.pokeTeam.find((x) => (x.id == poke.id))
          // );
        });
        this.nbpoke++;
      }
    });
  }

  onClick(index: number) {
    // console.log(index);
    // console.log(this.pokeTeam);

    this.pokemon = this.pokeTeam[index];
  }
}
