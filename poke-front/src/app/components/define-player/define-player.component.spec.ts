import { ComponentFixture, TestBed } from '@angular/core/testing';

import {expect} from '@jest/globals';

import { DefinePlayerComponent } from './define-player.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('DefinePlayerComponent', () => {
  let component: DefinePlayerComponent;
  let fixture: ComponentFixture<DefinePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
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
