import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RandomBattleService } from 'src/app/services/randomBattle.service';

@Component({
  selector: 'app-define-player',
  templateUrl: './define-player.component.html',
  styleUrls: ['./define-player.component.scss']
})
export class DefinePlayerComponent implements OnInit {

  playerForm = new UntypedFormGroup({
    p1: new UntypedFormControl(''),
    p2: new UntypedFormControl('')
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
