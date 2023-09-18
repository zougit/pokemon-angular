import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-dialog-detail-pokeshop',
  templateUrl: './dialog-detail-pokeshop.component.html',
  styleUrls: ['./dialog-detail-pokeshop.component.scss'],
})
export class DialogDetailPokeshopComponent implements OnInit, OnDestroy {
  pokemon!: Pokemon;
  pokesub!: Subscription;
  pokebd!: any;
  stats!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogDetailPokeshopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pokeService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokesub = this.pokeService
      .getPokemonById(this.data.poke_id)
      .subscribe((x) => {
        this.pokemon = x;
        console.log(x);
        this.pokemon.lvl = this.data.lvl;
        this.pokemon.exp = 0;
        this.pokemon.expMax = 100;
      });
  }

  ngAfterContentChecked(): void {
    if (this.pokemon) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.pokebd = {
      id_poke: this.pokemon.id,
      name: this.pokemon.name,
      lvl: this.data.lvl,
      exp: 0,
      expMax: 50,
      user_id: 2,
      team_id: null,
    };
    this.pokeService.addPokeDb(this.pokebd);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.pokesub.unsubscribe();
  }
}
