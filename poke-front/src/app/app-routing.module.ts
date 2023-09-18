import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { DefinePlayerComponent } from './components/define-player/define-player.component';
import { HomeComponent } from './components/home/home.component';
import { MenuViewComponent } from './views/menu-view/menu-view.component';
import { PokeChoiceComponent } from './components/poke-choice/poke-choice.component';
import { battleComponent } from './components/battle/battle.component';
import { TeamViewComponent } from './views/team-view/team-view.component';
import { ShopViewComponent } from './views/shop-view/shop-view.component';
import { AuthViewComponent } from './views/auth-view/auth-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { authGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: AuthViewComponent },
  { path: 'auth/signup', component: AuthViewComponent },
  { path: 'definePlayer', component: DefinePlayerComponent },
  { path: 'pokeChoice', component: PokeChoiceComponent },
  { path: 'battle', component: battleComponent },
  {
    path: 'menu',
    component: MenuViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'team',
    component: TeamViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'shop',
    component: ShopViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'arena',
    component: battleComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [authGuard],
    data: {path: 'admin'}
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
