import { INTEGER, STRING } from "sequelize";
import {
  Table,
  Model,
  Column,
  AllowNull,
  AutoIncrement,
  NotEmpty,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Shop } from "./shop";

@Table({ timestamps: false, tableName: "pokeshop" })
export class PokeShop extends Model<PokeShop> {
  @AutoIncrement
  @PrimaryKey
  @Column(INTEGER)
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column(STRING)
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  poke_id!: number; 

  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  price!: number;

  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  lvl!: number;
  
  @ForeignKey(() => Shop)
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  shop_id!: number;
  
  @BelongsTo(() => Shop)
  shop!: Shop;

}
