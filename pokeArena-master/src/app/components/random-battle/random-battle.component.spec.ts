import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBattleComponent } from './random-battle.component';

describe('RandomBattleComponent', () => {
  let component: RandomBattleComponent;
  let fixture: ComponentFixture<RandomBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomBattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
