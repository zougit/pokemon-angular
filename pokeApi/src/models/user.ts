import { INTEGER, STRING } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  AutoIncrement,
  NotEmpty,
  PrimaryKey,
  Unique,
  Default,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Team } from "./team";
import { Pokedb } from "./pokedb";

@Table({
  timestamps: false,
  tableName: "user",
})
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column(INTEGER)
  id!: number;

  @AllowNull(false)
  @NotEmpty
  @Unique
  @Column(STRING)
  username!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(STRING)
  password!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(STRING)
  role!: string;

  @AllowNull(true)
  @Default(0)
  @Column(INTEGER)
  money?: number;

  @HasMany(() => Team)
  teams!: Team[];

  @HasMany(() => Pokedb)
  pokemons!: Pokedb[];
}
