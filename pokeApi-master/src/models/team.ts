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

@Table({ timestamps: false, tableName: "teams" })
export class Team extends Model<Team> {
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

  @HasMany(() => Pokedb)
  pokemons!: Pokedb[];

  // @AllowNull(true)
  // @Default(0)
  // @Column(INTEGER)
  // poke_id?: number;
}
