import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinePlayerComponent } from './components/define-player/define-player.component';
import { HomeComponent } from './components/home/home.component';
import { PokeChoiceComponent } from './components/poke-choice/poke-choice.component';
import { RandomBattleComponent } from './components/random-battle/random-battle.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'definePlayer', component: DefinePlayerComponent},
  {path: 'pokeChoice', component: PokeChoiceComponent},
  {path: 'randomBattle', component: RandomBattleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
