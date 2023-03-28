import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRET_KEY: Secret =
  "anZgl2zTVIKDjRbMKoGo6I0tz8JpS4JMU6Gq9GTBmhMDaZhpQdYsoaUXdi/n4negvM4ljkhruODQKgU6tl/JxnwDbs2Pr5mLuXFJWeVGMfeFR2KRkknV+RLqewMOCkQdcQOhRgXpiJtXBLXJ5KiFoT00ItItIZdVURi97yQ5yYzD8UHFb0xJucCuHXNelTwLrbA/PpLe9BTzdR5lpkFZItobwf+A5fzLPhf5kQeL2XsZx00St1Epg6U+BhbRJ1oJoQxqIP9USYlRKc89ohcgJLzcpMEe3r7SZmsiJ+Rn4g2zgjA/ciZGDHFK3yL4HtRezQObYi6R4BUypQ0Cv5pjuw==";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
