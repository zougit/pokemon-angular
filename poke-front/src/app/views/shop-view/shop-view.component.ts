import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetailPokeshopComponent } from 'src/app/components/dialog-detail-pokeshop/dialog-detail-pokeshop.component';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.scss'],
})
export class ShopViewComponent implements OnInit {
  pokeShop!: any;
  pokemon!: Pokemon;

  constructor(
    private shopService: ShopService,
    private pokeService: PokemonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.shopService.getShopUser(2).subscribe((x: any) => {
      console.log(x.data.poke);

      this.pokeShop = x.data.poke;
    });
  }

  onClick(poke: any) {
    let dialogRef = this.dialog.open(DialogDetailPokeshopComponent, {
      data: poke,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
    });
  }
}
