import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailPokeshopComponent } from './dialog-detail-pokeshop.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogDetailPokeshopComponent', () => {
  let component: DialogDetailPokeshopComponent;
  let fixture: ComponentFixture<DialogDetailPokeshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterTestingModule,
        NgbModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      declarations: [DialogDetailPokeshopComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
    ]
    });
    fixture = TestBed.createComponent(DialogDetailPokeshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
