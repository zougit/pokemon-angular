import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon.model';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon!: Pokemon;
  @Input() pokeNb: number = 0;
  @Input() isFront!: boolean;
  @Input() player?: string;

  constructor( private pokeService: PokemonService ) {

  }

  ngOnInit(): void {
  }
}
