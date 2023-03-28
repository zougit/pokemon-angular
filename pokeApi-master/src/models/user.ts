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
  Unique
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users",
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
}
