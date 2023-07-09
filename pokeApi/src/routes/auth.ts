import { Router } from "express";
import * as userController from '../controllers/auth';

const authRouter = Router();

authRouter.post('/register', userController.registerOne);
authRouter.post('/login', userController.loginOne);

export {authRouter};