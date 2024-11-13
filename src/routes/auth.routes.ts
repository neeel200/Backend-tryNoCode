/* 
register
login
logout */

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();

/* /api/auth */

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);

export default authRouter;

