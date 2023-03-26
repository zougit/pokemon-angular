import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DefinePlayerComponent } from './components/define-player/define-player.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { PokeChoiceComponent } from './components/poke-choice/poke-choice.component';
import { RandomBattleComponent } from './components/random-battle/random-battle.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'definePlayer', component: DefinePlayerComponent},
  {path: 'pokeChoice', component: PokeChoiceComponent},
  {path: 'randomBattle', component: RandomBattleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
