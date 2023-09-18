import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './services/pokemon/pokemon.service';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefinePlayerComponent } from './components/define-player/define-player.component';
import { HomeComponent } from './components/home/home.component';
import { battleComponent } from './components/battle/battle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeChoiceComponent } from './components/poke-choice/poke-choice.component';
import { AuthComponent } from './components/auth/auth.component';
import { TeamViewComponent } from './views/team-view/team-view.component';
import { ProfilViewComponent } from './views/profil-view/profil-view.component';
import { MenuViewComponent } from './views/menu-view/menu-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPokeComponent } from './components/dialog/dialog-poke/dialog-poke.component';
import { ShopViewComponent } from './views/shop-view/shop-view.component';
import { DialogDetailPokeshopComponent } from './components/dialog/dialog-detail-pokeshop/dialog-detail-pokeshop.component';
import { AuthService } from './services/auth/auth.service';
import { TeamService } from './services/team/team.service';
import { ShopService } from './services/shop/shop.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthViewComponent } from './views/auth-view/auth-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { DialogUserDetailComponent } from './components/dialog/dialog-user-detail/dialog-user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    battleComponent,
    DefinePlayerComponent,
    HomeComponent,
    PokeChoiceComponent,
    AuthComponent,
    TeamViewComponent,
    ProfilViewComponent,
    MenuViewComponent,
    DialogPokeComponent,
    ShopViewComponent,
    DialogDetailPokeshopComponent,
    AuthViewComponent,
    AdminViewComponent,
    DialogUserDetailComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthService,
    PokemonService,
    TeamService,
    ShopService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
