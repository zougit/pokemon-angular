import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { BattleService } from 'src/app/services/battle/battle.service';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss'],
})
export class MenuViewComponent {
  constructor(private router: Router, private battleService: BattleService) {}

  getRandom(length : number) {
    let randomArray = []
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    randomArray.push(randomNumber);
    }
    return randomArray
  }

  goBattle() {
    let user: User = JSON.parse(localStorage.getItem('user')!);
    let ids = user.teams.flatMap((x) => x.pokemons.map((y) => y.id_poke));    
    let randomTeam = this.getRandom(ids.length);
    let teams = [ids,randomTeam];
    this.router
      .navigate(['arena'])
      .then(() => this.battleService.pokemonsIdSub.next(teams));
      // .then(() => console.log(teams));
  }
}
