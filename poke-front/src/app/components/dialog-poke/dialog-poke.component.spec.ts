import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPokeComponent } from './dialog-poke.component';

describe('DialogPokeComponent', () => {
  let component: DialogPokeComponent;
  let fixture: ComponentFixture<DialogPokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPokeComponent]
    });
    fixture = TestBed.createComponent(DialogPokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
