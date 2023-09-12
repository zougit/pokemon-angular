import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilViewComponent } from './profil-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ProfilViewComponent', () => {
  let component: ProfilViewComponent;
  let fixture: ComponentFixture<ProfilViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
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
