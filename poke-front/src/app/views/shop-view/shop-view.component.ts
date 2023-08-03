import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss'],
})
export class ShopViewComponent implements OnInit {
  pokeShop!: any;

  constructor(
    private shopService: ShopService,
    private pokeService: PokemonService
  ) {}

  ngOnInit(): void {
    this.shopService.getShopUser(2).subscribe((x: any) => {
      console.log(x.data.poke);
      
      this.pokeShop = x.data.poke;
    });
  }
}
