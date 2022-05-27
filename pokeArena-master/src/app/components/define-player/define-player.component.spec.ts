import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePlayerComponent } from './define-player.component';

describe('DefinePlayerComponent', () => {
  let component: DefinePlayerComponent;
  let fixture: ComponentFixture<DefinePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
