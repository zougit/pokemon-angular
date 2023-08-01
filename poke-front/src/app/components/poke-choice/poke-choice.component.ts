import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeCardProps } from 'src/app/models/pokeCard.model';
import { BattleService } from 'src/app/services/battle/battle.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-poke-choice',
  templateUrl: './poke-choice.component.html',
  styleUrls: ['./poke-choice.component.scss']
})
export class PokeChoiceComponent implements OnInit {

  pokeCards: Array<PokeCardProps> = [];
  pokemonPlayer: Array<number[]> = new Array<number[]>(2);

  constructor(private pokeService: PokemonService,private battleService: BattleService , private route: Router) { }

  ngOnInit(): void {
    this.pokemonPlayer[0] = [];
    this.pokemonPlayer[1] = [];

    this.pokeService.getAll().subscribe( response => {
      this.pokeCards = response;
    });
  }

  selectPoke(player: number, index: number): void {
    if (this.pokemonPlayer[player].length < 6 ) {
      this.pokemonPlayer[player].push(index)
      // console.log(this.pokemonPlayer);
    }

    // console.log(!this.pokemonPlayer[player].some((i) => i == index));
    
  }

  fight(): void {
    if (this.pokemonPlayer[0].length !== 0 && this.pokemonPlayer[1].length !== 0){
      this.battleService.pokemonsIdSub.next(this.pokemonPlayer)
      this.route.navigate(['battle']);
    }
  }

}
