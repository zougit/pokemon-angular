import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/auth";

export async function register(user: User): Promise<void> {
  try {
    const saltRounds = 8;
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
    if (!foundUser) {
      throw new Error("Name of user is not correct");
    }

    const isMatch = bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign({ _id: foundUser.id?.toString(), username: foundUser.username }, SECRET_KEY, {
        expiresIn: '1 days',
      });
 
      return { user: { _id: foundUser.id?.toString(), username: foundUser.username }, token: token };

    } else {
      throw new Error("Password is not correct");
    }

  } catch (error) {
    throw error;
  }
}
