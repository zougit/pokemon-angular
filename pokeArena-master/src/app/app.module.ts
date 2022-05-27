import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefinePlayerComponent } from './components/define-player/define-player.component';
import { HomeComponent } from './components/home/home.component';
import { RandomBattleComponent } from './components/random-battle/random-battle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeChoiceComponent } from './components/poke-choice/poke-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    RandomBattleComponent,
    DefinePlayerComponent,
    HomeComponent,
    PokeChoiceComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
