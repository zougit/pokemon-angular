import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeChoiceComponent } from './poke-choice.component';

describe('PokeChoiceComponent', () => {
  let component: PokeChoiceComponent;
  let fixture: ComponentFixture<PokeChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
