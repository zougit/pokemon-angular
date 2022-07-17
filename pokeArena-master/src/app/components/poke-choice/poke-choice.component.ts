import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeCardProps } from 'src/app/models/pokeCard.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-choice',
  templateUrl: './poke-choice.component.html',
  styleUrls: ['./poke-choice.component.scss']
})
export class PokeChoiceComponent implements OnInit {

  pokeCards: Array<PokeCardProps> = [];
  pokemonPlayer: Array<Array<number>> = new Array<Array<number>>(2);

  constructor(private pokeService: PokemonService, private route: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < this.pokemonPlayer.length; i++){
      this.pokemonPlayer[i] = new Array<number>(1);
    }
    this.pokemonPlayer[0][0] = 0;
    this.pokemonPlayer[1][0] = 0;


    this.pokeService.getAll().subscribe( response => {
      this.pokeCards = response;
    });
  }

  selectPoke(player: number, index: number): void {
    this.pokemonPlayer[player][0] = index;
  }

  fight(): void {
    if (this.pokemonPlayer[0][0] !== 0 && this.pokemonPlayer[1][0] !== 0){
      this.route.navigate(['randomBattle'],
        {
          queryParams: {
            pokemonPlayer: this.pokemonPlayer
          }
        }
      );
    }
  }


  lastPage(): void{
    this.route.navigate(['definePlayer']);
  }

}
