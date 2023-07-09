import { Router } from "express";
import * as userController from '../controllers/user';

const userRouter = Router();

userRouter.get('/get/:id', userController.getUser);
userRouter.get('/getAll', userController.getAllUser);
userRouter.put('/update/:id', userController.updateUser);

export {userRouter}