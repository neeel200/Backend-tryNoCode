/**
 get my profile
 */

import { Router } from "express";
import {UserController} from "../controllers/user.controller"

const userRouter = Router();

/* /api/user */

userRouter.get("/profile", UserController.getUserProfile);

export default userRouter;
