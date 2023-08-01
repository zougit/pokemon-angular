import { ComponentFixture, TestBed } from '@angular/core/testing';

import { battleComponent } from './battle.component';

describe('battleComponent', () => {
  let component: battleComponent;
  let fixture: ComponentFixture<battleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [battleComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(battleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
