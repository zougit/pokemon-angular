import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RandomBattleService } from 'src/app/services/randomBattle.service';

@Component({
  selector: 'app-define-player',
  templateUrl: './define-player.component.html',
  styleUrls: ['./define-player.component.scss']
})
export class DefinePlayerComponent implements OnInit {

  playerForm = new FormGroup({
    p1: new FormControl(''),
    p2: new FormControl('')
  });

  constructor(private battleService: RandomBattleService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.battleService.addPlayers([this.playerForm.value.p1, this.playerForm.value.p2]);
    this.router.navigate(['pokeChoice']);
  }

  lastPage(): void{
    this.router.navigate(['']);
  }

}
