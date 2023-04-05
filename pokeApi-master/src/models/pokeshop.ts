import { INTEGER, STRING } from "sequelize";
import {
  Table,
  Model,
  Column,
  AllowNull,
  AutoIncrement,
  NotEmpty,
  PrimaryKey,
  Default,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user";
import { Pokedb } from "./pokedb";
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
  @Column(STRING)
  price!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(STRING)
  lvl!: string;
  
  @BelongsTo(() => Shop)
  shop!: Shop;

}
