import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopViewComponent } from './shop-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ShopViewComponent', () => {
  let component: ShopViewComponent;
  let fixture: ComponentFixture<ShopViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      declarations: [ShopViewComponent]
    });
    fixture = TestBed.createComponent(ShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
