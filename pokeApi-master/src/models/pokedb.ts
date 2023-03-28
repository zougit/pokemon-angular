import { INTEGER, STRING } from "sequelize";
import {
  Table,
  Model,
  Column,
  AllowNull,
  NotEmpty,
  PrimaryKey,
  ForeignKey
} from "sequelize-typescript";
import { User } from "./user";

@Table({
  timestamps: false,
  tableName: "pokemons",
})
export class Pokedb extends Model<Pokedb> {
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
  exp!: number;
  
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  expMax!: number;

  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  lvl!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  user_id!: number;
}
