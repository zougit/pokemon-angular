import { INTEGER } from "sequelize";
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
} from "sequelize-typescript";
import { User } from "./user";

@Table({
  timestamps: false,
  tableName: "teams",
})
export class Team extends Model<Team> {
  @AutoIncrement
  @PrimaryKey
  @Column(INTEGER)
  id!: number;
  
  @ForeignKey(() => User)
  @AllowNull(false)
  @NotEmpty
  @Column(INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(true)
  @Default(0)
  @Column(INTEGER)
  poke_id?: number;
}
