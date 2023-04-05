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
import { INTEGER } from "sequelize";

@Table({ timestamps: false, tableName: "shops" })
export class Shop extends Model<Shop> {
  @AutoIncrement
  @PrimaryKey
  @Column(INTEGER)
  id!: number;
  
  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => PokeShop)
  poke!: PokeShop[];
}
