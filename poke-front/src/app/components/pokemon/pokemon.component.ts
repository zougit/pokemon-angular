import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import pokemonDefault from '../../models/pokedefault';
import { Pokemon } from '../../models/Pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  providers: [
    PokemonService
  ]
})
export class PokemonComponent implements OnInit {

  @Input() pokemon!: Pokemon;
  @Input() isFront!: boolean;
  @Input() player?: string;



  constructor( private pokeService: PokemonService ) {

  }

  ngOnInit(): void {
  }
}
