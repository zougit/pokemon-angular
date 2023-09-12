import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

import { PokeChoiceComponent } from './poke-choice.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('PokeChoiceComponent', () => {
  let component: PokeChoiceComponent;
  let fixture: ComponentFixture<PokeChoiceComponent>;
  let pokeServiceStub: Partial<PokemonService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
      ],
      declarations: [PokeChoiceComponent],
      providers: [PokemonService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(PokeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
