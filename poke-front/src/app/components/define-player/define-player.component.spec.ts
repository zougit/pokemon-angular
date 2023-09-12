import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePlayerComponent } from './define-player.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('DefinePlayerComponent', () => {
  let component: DefinePlayerComponent;
  let fixture: ComponentFixture<DefinePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
      ],
      declarations: [DefinePlayerComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
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
