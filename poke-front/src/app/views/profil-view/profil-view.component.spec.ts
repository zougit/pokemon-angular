import { ComponentFixture, TestBed } from '@angular/core/testing';

import {expect} from '@jest/globals';

import { ProfilViewComponent } from './profil-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfilViewComponent', () => {
  let component: ProfilViewComponent;
  let fixture: ComponentFixture<ProfilViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
      ],
      declarations: [ProfilViewComponent]
    });
    fixture = TestBed.createComponent(ProfilViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
