import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailPokeshopComponent } from './dialog-detail-pokeshop.component';

describe('DialogDetailPokeshopComponent', () => {
  let component: DialogDetailPokeshopComponent;
  let fixture: ComponentFixture<DialogDetailPokeshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailPokeshopComponent]
    });
    fixture = TestBed.createComponent(DialogDetailPokeshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
