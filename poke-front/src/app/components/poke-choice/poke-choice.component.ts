import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeCardProps } from 'src/app/models/pokeCard.model';
import { BattleService } from 'src/app/services/battle/battle.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-poke-choice',
  templateUrl: './poke-choice.component.html',
  styleUrls: ['./poke-choice.component.scss'],
})
export class PokeChoiceComponent implements OnInit {
  pokeCards: Array<PokeCardProps> = [];
  pokemonPlayer: Array<number[]> = new Array<number[]>(2);

  selectedCardsPlayer1: boolean[] = [];
  selectedCardsPlayer2: boolean[] = [];

  constructor(
    private pokeService: PokemonService,
    private battleService: BattleService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.pokemonPlayer[0] = [];
    this.pokemonPlayer[1] = [];

    this.pokeService.getAll().subscribe((response) => {
      this.pokeCards = response;
    });

    this.selectedCardsPlayer1 = Array(this.pokeCards.length).fill(false);
    this.selectedCardsPlayer2 = Array(this.pokeCards.length).fill(false);
  }

  // selectPoke(player: number, index: number): void {
  //   if (this.pokemonPlayer[player].length < 6 ) {
  //     this.pokemonPlayer[player].push(index)
  //     // console.log(this.pokemonPlayer);
  //   }

  //   // console.log(!this.pokemonPlayer[player].some((i) => i == index));

  // }

  selectPoke(player: number, index: number): void {
    const selectedCardsArray =
      player === 0 ? this.selectedCardsPlayer1 : this.selectedCardsPlayer2;

    if (selectedCardsArray[index]) {
      // Deselect the card
      selectedCardsArray[index] = false;
      this.pokemonPlayer[player].splice(
        this.pokemonPlayer[player].indexOf(index),
        1
      );
    } else if (this.pokemonPlayer[player].length < 6) {
      // Select the card if the player has less than 6 selected cards
      selectedCardsArray[index] = true;
      this.pokemonPlayer[player].push(index);
    }
  }

  isCardSelected(player: number, cardId: number): boolean {
    const selectedCardsArray =
      player === 0 ? this.selectedCardsPlayer1 : this.selectedCardsPlayer2;
    return selectedCardsArray[cardId];
  }

  fight(): void {
    if (
      this.pokemonPlayer[0].length !== 0 &&
      this.pokemonPlayer[1].length !== 0
    ) {
      this.battleService.pokemonsIdSub.next(this.pokemonPlayer);
      this.route.navigate(['battle']);
    }
  }
}
