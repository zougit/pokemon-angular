import { User } from "../models/user";
import bcrypt from 'bcrypt';

export async function register(user: User): Promise<void> {
  try {

    const saltRounds = 8
    user.password = await bcrypt.hash(user.password, saltRounds);
    await User.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: User) {
  try {
    const foundUser = await User.findOne({
      where: { username: user.username },
    });
    return foundUser
  } catch (error) {
    throw error;
  }
}
