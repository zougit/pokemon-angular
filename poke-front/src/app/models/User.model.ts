export interface UserProps {
  id: string;
  username: string;
  password: string;
  role: string;
  money: number;
}

export class User implements UserProps {
  id!: string;
  username: string;
  password: string;
  role: string;
  money: number;

  constructor(user: UserProps) {
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.money = user.money;
  }
}
