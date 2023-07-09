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
  AutoIncrement,
  DataType
} from "sequelize-typescript";
import { User, Team} from ".";

@Table({
  timestamps: false,
  tableName: "pokemon",
})
export class Pokedb extends Model<Pokedb> {
  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER)
  declare id: number;
  
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  declare id_poke: number;

  @AllowNull(false)
  @NotEmpty
  @Column(STRING)
  declare name: string;

  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  declare exp: number;
  
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  declare expMax: number;

  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  declare lvl: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  declare user_id: number;
  
  @ForeignKey(() => Team)
  @Column(INTEGER)
  declare team_id?: number;
  
  @BelongsTo(() => User)
  declare user: User;

  // @BelongsTo(() => Team)
  // teams!: Team[];
}
