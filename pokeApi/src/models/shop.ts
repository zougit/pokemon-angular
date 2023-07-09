import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  NotEmpty,
} from "sequelize-typescript";
import { User, PokeShop } from ".";
import { INTEGER, STRING } from "sequelize";

@Table({ tableName: "shop" })
export class Shop extends Model<Shop> {
  @AutoIncrement
  @PrimaryKey
  @Column(INTEGER)
  id!: number;
  
  @AllowNull(false)
  @NotEmpty
  @Column(STRING)
  name!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => PokeShop)
  poke!: PokeShop[];
}
