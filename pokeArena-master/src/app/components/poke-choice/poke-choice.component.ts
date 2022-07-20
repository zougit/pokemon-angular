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
  pokemonPlayer: Array<number> = new Array<number>(2);

  constructor(private pokeService: PokemonService, private route: Router) { }

  ngOnInit(): void {
    this.pokemonPlayer[0] = 0;
    this.pokemonPlayer[1] = 0;

    this.pokeService.getAll().subscribe( response => {
      this.pokeCards = response;
    });
  }

  selectPoke(player: number, index: number): void {
    this.pokemonPlayer[player] = index;
  }

  fight(): void {
    if (this.pokemonPlayer[0] !== 0 && this.pokemonPlayer[1] !== 0){
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
