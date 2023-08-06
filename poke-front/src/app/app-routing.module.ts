import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DefinePlayerComponent } from './components/define-player/define-player.component';
import { HomeComponent } from './components/home/home.component';
import { MenuViewComponent } from './views/menu-view/menu-view.component';
import { PokeChoiceComponent } from './components/poke-choice/poke-choice.component';
import { battleComponent } from './components/battle/battle.component';
import { TeamViewComponent } from './views/team-view/team-view.component';
import { ShopViewComponent } from './views/shop-view/shop-view.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  { path: 'menu', component: MenuViewComponent, canActivate: [AuthGuard] },
  { path: 'definePlayer', component: DefinePlayerComponent },
  { path: 'pokeChoice', component: PokeChoiceComponent },
  { path: 'battle', component: battleComponent },
  { path: 'team', component: TeamViewComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopViewComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}