import { User } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/auth";



export async function register(user: User): Promise<void> {
  try {
    if (!user.username || !user.role || !user.password) throw new Error("need a username,password,role");

    const saltRounds = 8;
    user.password = await bcrypt.hash(user.password, saltRounds);

    let is_goodRole = false;
    const roles = ["user", "admin"];
    for (const r of roles) {
      if (user.role === r) {
        is_goodRole = true;
        break;
      }
    }

    let user_exist = false;
    const users = await User.findAll();
    for (const u of users) {
      if (user.username === u.username) {
        user_exist = true;
        break;
      }
    }

    if (is_goodRole && !user_exist) {
      await User.create(user);
    } else if(!is_goodRole) {
      throw new Error("roles are : user or admin");
    } else if(user_exist) {
      throw new Error("username already used");
    }

  } catch (error) {
    throw error;
  }
}

export async function login(user: User) {
  try {
    if (!user.username || !user.password) throw new Error("need a username,password");
    
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
