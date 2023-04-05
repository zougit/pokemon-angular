import { INTEGER, STRING } from "sequelize";
import {
  Table,
  Model,
  Column,
  AllowNull,
  NotEmpty,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  AutoIncrement
} from "sequelize-typescript";
import { User, Team} from "./";

@Table({
  timestamps: false,
  tableName: "pokemons",
})
export class Pokedb extends Model<Pokedb> {
  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER)
  id!: number;
  
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  id_poke!: number;

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
  
  @ForeignKey(() => Team)
  @Column(INTEGER)
  team_id?: number;
  
  @BelongsTo(() => User)
  user!: User;

  // @BelongsTo(() => Team)
  // teams!: Team[];
}
