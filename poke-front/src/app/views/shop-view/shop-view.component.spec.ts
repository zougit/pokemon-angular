import { ComponentFixture, TestBed } from '@angular/core/testing';

import {expect} from '@jest/globals';

import { ShopViewComponent } from './shop-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ShopService } from 'src/app/services/shop/shop.service';
import { of } from 'rxjs';

const matDialogMock = {
  open: () => ({ afterClosed: () => of({}) }),
};

describe('ShopViewComponent', () => {
  let component: ShopViewComponent;
  let fixture: ComponentFixture<ShopViewComponent>;
  let shopService: ShopService;
  let pokeService: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [ShopViewComponent],
      providers: [
        ShopService,
        PokemonService,
        { provide: MatDialog, useValue: matDialogMock },
      ],
    });
    fixture = TestBed.createComponent(ShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    shopService = TestBed.inject(ShopService);
    pokeService = TestBed.inject(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog when onClick is called', () => {
    const mockPoke = {
      /* Replace with your mock Pokemon data */
    };

    // Mock the behavior of MatDialog open and afterClosed methods
    jest
      .spyOn(matDialogMock, 'open')
      .mockReturnValue({ afterClosed: () => of({}) });

    component.onClick(mockPoke);

    expect(matDialogMock.open).toHaveBeenCalled();
  });
});
