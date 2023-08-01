import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DefinePlayerComponent } from './components/define-player/define-player.component';
import { HomeComponent } from './components/home/home.component';
import { MenuViewComponent } from './views/menu-view/menu-view.component';
import { PokeChoiceComponent } from './components/poke-choice/poke-choice.component';
import { battleComponent } from './components/battle/battle.component';
import { TeamViewComponent } from './views/team-view/team-view.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'menu', component: MenuViewComponent},
  {path: 'definePlayer', component: DefinePlayerComponent},
  {path: 'pokeChoice', component: PokeChoiceComponent},
  {path: 'battle', component: battleComponent},
  {path: 'team', component: TeamViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
